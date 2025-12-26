import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import { useGoalCategories, DEFAULT_CATEGORY_LABELS } from "@/hooks/useGoalCategories";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
    red: "bg-rose-500",
    orange: "bg-orange-500",
    yellow: "bg-amber-400",
    blue: "bg-blue-600",
    purple: "bg-violet-600",
    pink: "bg-fuchsia-500",
    cyan: "bg-cyan-500",
};

export function GoalCategorySettingsDialog() {
    const { categoryLabels, updateSettings } = useGoalCategories();
    const [localLabels, setLocalLabels] = useState<Record<string, string>>(categoryLabels);
    const [open, setOpen] = useState(false);

    // Sync local state when open
    useEffect(() => {
        if (open) {
            setLocalLabels(categoryLabels);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleSave = () => {
        updateSettings(localLabels);
        setOpen(false);
    };

    const handleChange = (color: string, value: string) => {
        setLocalLabels(prev => ({ ...prev, [color]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Impostazioni Categorie">
                    <Settings2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Personalizza Categorie</DialogTitle>
                    <DialogDescription>
                        Assegna un nome personalizzato ad ogni colore per organizzare meglio i tuoi obiettivi.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {Object.entries(DEFAULT_CATEGORY_LABELS).map(([color, defaultLabel]) => (
                        <div key={color} className="grid grid-cols-4 items-center gap-4">
                            <div className="flex items-center gap-2 col-span-1">
                                <div className={cn("w-4 h-4 rounded-full", categoryColors[color])} />
                            </div>
                            <Input
                                id={color}
                                value={localLabels[color] || ""}
                                placeholder={defaultLabel}
                                onChange={(e) => handleChange(color, e.target.value)}
                                className="col-span-3 h-9"
                            />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Salva Modifiche</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
