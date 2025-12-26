import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useMemo } from 'react';

export const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
    red: 'Rosso',
    orange: 'Arancione',
    yellow: 'Giallo',
    blue: 'Blu',
    purple: 'Viola',
    pink: 'Rosa',
    cyan: 'Ciano',
};

export interface GoalCategorySettings {
    id: string;
    user_id: string;
    mappings: Record<string, string>;
}

export function useGoalCategories() {
    const queryClient = useQueryClient();

    const { data: settings, isLoading } = useQuery({
        queryKey: ['goalCategorySettings'],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const { data, error } = await supabase
                .from('goal_category_settings')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
                console.error('Error fetching category settings:', error);
            }
            return data as GoalCategorySettings | null;
        },
    });

    const updateSettingsMutation = useMutation({
        mutationFn: async (newMappings: Record<string, string>) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Check if row exists, if not create, else update
            const { data: existing } = await supabase
                .from('goal_category_settings')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (existing) {
                const { error } = await supabase
                    .from('goal_category_settings')
                    .update({ mappings: newMappings })
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('goal_category_settings')
                    .insert({ user_id: user.id, mappings: newMappings });
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['longTermGoals'] }); // Invalidate goals to refresh colors if needed
            queryClient.invalidateQueries({ queryKey: ['goalCategorySettings'] });
            toast.success('Categorie aggiornate con successo');
        },
        onError: () => {
            toast.error('Errore durante l\'aggiornamento delle categorie');
        }
    });

    const categoryLabels = useMemo(() => {
        return { ...DEFAULT_CATEGORY_LABELS, ...settings?.mappings };
    }, [settings]);

    const getLabel = (color: string | null) => {
        if (!color) return 'Generale';
        const customLabel = settings?.mappings?.[color];
        return customLabel || DEFAULT_CATEGORY_LABELS[color] || color;
    };

    return {
        settings,
        isLoading,
        updateSettings: updateSettingsMutation.mutate,
        getLabel,
        categoryLabels
    };
}
