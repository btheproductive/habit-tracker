import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Loader2, Trophy, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

import { useGoalCategories } from '@/hooks/useGoalCategories';

interface MacroGoalsStatsProps {
    year: number;
}

const COLORS = ['#f43f5e', '#f97316', '#fbbf24', '#2563eb', '#7c3aed', '#d946ef', '#06b6d4', '#10b981'];

export function MacroGoalsStats({ year }: MacroGoalsStatsProps) {
    const { getLabel } = useGoalCategories();
    const { data: allGoals, isLoading } = useQuery({
        queryKey: ['longTermGoals', 'stats', year],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('long_term_goals')
                .select('*')
                .eq('year', year);
            if (error) throw error;
            return data;
        },
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>;
    }

    if (!allGoals || allGoals.length === 0) {
        return (
            <div className="text-center p-12 border border-dashed border-white/10 rounded-xl text-muted-foreground">
                Nessun dato disponibile per il {year}. Aggiungi qualche obiettivo!
            </div>
        );
    }

    // Calculations
    const totalGoals = allGoals.length;
    const completedGoals = allGoals.filter(g => g.is_completed).length;
    const completionRate = Math.round((completedGoals / totalGoals) * 100) || 0;

    const byType = {
        annual: allGoals.filter(g => g.type === 'annual').length,
        monthly: allGoals.filter(g => g.type === 'monthly').length,
        weekly: allGoals.filter(g => g.type === 'weekly').length,
    };

    // Monthly Progress (Completion Rate per Month)
    // Initialize all months
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        name: new Date(2024, i).toLocaleString('it-IT', { month: 'short' }),
        total: 0,
        completed: 0,
        rate: 0
    }));

    allGoals.forEach(g => {
        if (g.month && g.month >= 1 && g.month <= 12) {
            const idx = g.month - 1;
            monthlyData[idx].total++;
            if (g.is_completed) monthlyData[idx].completed++;
        }
    });

    // Calculate rates
    monthlyData.forEach(d => {
        d.rate = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0;
    });

    // Color Distribution
    const colorStats: Record<string, number> = {};
    allGoals.forEach(g => {
        const c = g.color || 'null'; // Use 'null' string key for undefined
        colorStats[c] = (colorStats[c] || 0) + 1;
    });

    // Map internal color names to UI friendly stats if needed, or just use raw for now
    // We can map: 'red' -> 'Rosso', etc. if we want better labels.
    const chartColors: Record<string, string> = {
        'red': '#f43f5e', 'orange': '#f97316', 'yellow': '#fbbf24', 'green': '#10b981',
        'blue': '#2563eb', 'purple': '#7c3aed', 'pink': '#d946ef', 'cyan': '#06b6d4', 'null': '#525252'
    };

    const colorData = Object.entries(colorStats).map(([key, value]) => ({
        name: getLabel(key === 'null' ? null : key),
        value,
        fill: chartColors[key] || '#888888'
    })).sort((a, b) => b.value - a.value);


    return (
        <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Totale Obiettivi</CardTitle>
                        <Target className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalGoals}</div>
                        <p className="text-xs text-muted-foreground">Nel {year}</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completati</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{completedGoals}</div>
                        <p className="text-xs text-muted-foreground">Su {totalGoals} totali</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Tasso Successo</CardTitle>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{completionRate}%</div>
                        <p className="text-xs text-muted-foreground">Media annuale</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Focus</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {byType.weekly > byType.monthly ? 'Settimanale' : 'Mensile'}
                        </div>
                        <p className="text-xs text-muted-foreground">Tipo più frequente</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Monthly Progress Chart */}
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Progresso Mensile (%)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #333', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar dataKey="rate" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Completamento" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Color Distribution Pie */}
                <Card className="bg-card/40 border-white/5 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Distribuzione Categorie</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={colorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {colorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #333', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
