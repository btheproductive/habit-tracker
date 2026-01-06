import { useGoals } from '@/hooks/useGoals';
import { useHabitStats, Timeframe } from '@/hooks/useHabitStats';
import { StatsOverview } from '@/components/stats/StatsOverview';
import { ActivityHeatmap } from '@/components/stats/ActivityHeatmap';
import { TrendChart } from '@/components/stats/TrendChart';
import { HabitRadar } from '@/components/stats/HabitRadar';
import { DayOfWeekChart } from '@/components/stats/DayOfWeekChart';
import { PeriodComparison } from '@/components/stats/PeriodComparison';
import { CriticalAnalysis } from '@/components/stats/CriticalAnalysis';
import { Trophy } from 'lucide-react';
import { usePrivacy } from '@/context/PrivacyContext';
import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Stats = () => {
    const { goals, logs } = useGoals();
    const [trendTimeframe, setTrendTimeframe] = useState<Timeframe>('weekly');
    const stats = useHabitStats(goals, logs, trendTimeframe);
    const { isPrivacyMode } = usePrivacy();

    // Find best habit safely
    const bestHabit = stats.habitStats.length > 0
        ? stats.habitStats.reduce((prev, current) => (prev.completionRate > current.completionRate) ? prev : current, stats.habitStats[0])
        : null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 animate-fade-in pb-24">
            {/* Background Glow */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className={cn("space-y-2 transition-all duration-300", isPrivacyMode && "blur-sm")}>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Le tue Statistiche</h1>
                <p className="text-muted-foreground font-light text-lg">Analisi dettagliata delle tue performance.</p>
            </div>

            {/* Overview Cards */}
            {/* Overview Cards */}
            <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                <StatsOverview
                    globalStats={{
                        totalActiveDays: stats.totalActiveDays,
                        globalSuccessRate: stats.globalSuccessRate,
                        bestStreak: stats.bestStreak,
                        worstDay: stats.worstDay,
                    }}
                    bestHabit={bestHabit || undefined}
                />
            </div>

            {/* Heatmap - Full Width */}
            <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-primary animate-pulse" />
                    Attività Recente
                </h3>
                <ActivityHeatmap data={stats.heatmapData} />
            </div>

            {/* Period Comparison */}
            {/* Period Comparison */}
            <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                <PeriodComparison comparisons={stats.comparisons} goals={goals} />
            </div>

            {/* Critical Analysis */}
            {/* Critical Analysis */}
            <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                <CriticalAnalysis criticalHabits={stats.criticalHabits} />
            </div>

            {/* Trends - Full Width */}
            <div className="glass-panel rounded-3xl p-6 h-[450px] flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-display font-semibold">Trend</h3>
                    <Tabs value={trendTimeframe} onValueChange={(v) => setTrendTimeframe(v as Timeframe)} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-4 sm:w-[400px]">
                            <TabsTrigger value="weekly">Settimana</TabsTrigger>
                            <TabsTrigger value="monthly">Mese</TabsTrigger>
                            <TabsTrigger value="annual">Anno</TabsTrigger>
                            <TabsTrigger value="all">Tutto</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="flex-1 w-full min-h-0">
                    <TrendChart data={stats.trendData} />
                </div>
            </div>

            {/* Radar Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cn("glass-panel rounded-3xl p-6 h-[400px] flex flex-col transition-all duration-300", isPrivacyMode && "blur-sm")}>
                    <h3 className="text-lg font-display font-semibold mb-4">Focus Abitudini</h3>
                    <div className="flex-1 w-full min-h-0">
                        <HabitRadar stats={stats.habitStats} />
                    </div>
                </div>
                {/* Empty slot or move another chart here? For now, we can leave Radar full width or share with something else if available. 
                    Actually, let's keep Radar alongside DayOfWeekChart or just let it start a new row.
                    The design requested Trend full width. 
                    Original Row 1 was Trend + Radar. 
                    Original Row 2 was Costanza Settimanale (DayOfWeek).
                    
                    Let's make:
                    1. Overview
                    2. Heatmap (Full)
                    3. Comparison
                    4. Trend (Full)
                    5. Radar + DayOfWeek (Grid 2 cols) -> Efficient use of space
                */}
                <div className="glass-panel rounded-3xl p-6 h-[400px] flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-display font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-sm bg-primary animate-pulse" />
                            Costanza Settimanale
                        </h3>
                        <p className="text-sm text-muted-foreground">Scopri in quali giorni sei più produttivo.</p>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <DayOfWeekChart data={stats.weekdayStats} />
                    </div>
                </div>
            </div>



            {/* Detailed Table */}
            <div className={cn("glass-panel rounded-3xl p-6 transition-all duration-300", isPrivacyMode && "blur-sm")}>
                <h3 className="text-lg font-display font-semibold mb-6">Dettagli Abitudini</h3>
                <div className="space-y-3">
                    {stats.habitStats.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">Nessuna abitudine tracciata ancora.</p>
                    ) : (
                        stats.habitStats.map(habit => {
                            const criticalStat = stats.criticalHabits.find(c => c.habitId === habit.id);
                            return (
                                <div key={habit.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shrink-0" style={{ color: habit.color, borderColor: `${habit.color}40`, boxShadow: `0 0 20px ${habit.color}10` }}>
                                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: habit.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="font-semibold text-foreground text-lg truncate block">{habit.title}</span>
                                            <div className="h-1 w-20 bg-secondary rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${habit.completionRate}%`, backgroundColor: habit.color }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8 text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                                        {criticalStat && criticalStat.worstDay !== 'N/A' && (
                                            <div className="flex flex-col items-start sm:items-end p-2 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none">
                                                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5 text-destructive">Worst</span>
                                                <span className="font-medium text-foreground">{criticalStat.worstDay}</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-start sm:items-end p-2 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none">
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5 flex items-center gap-1">
                                                <Trophy className="w-3 h-3 text-yellow-500" /> Best
                                            </span>
                                            <span className="font-mono text-xl font-bold text-foreground">{habit.longestStreak} <span className="text-xs font-sans font-normal opacity-50">gg</span></span>
                                        </div>
                                        <div className="flex flex-col items-start sm:items-end p-2 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none">
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">Serie</span>
                                            <span className="font-mono text-xl font-bold text-foreground">{habit.currentStreak} <span className="text-xs font-sans font-normal opacity-50">gg</span></span>
                                        </div>
                                        <div className="flex flex-col items-start sm:items-end p-2 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none">
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">Rate</span>
                                            <span className="font-mono text-xl font-bold text-foreground">{habit.completionRate}<span className="text-sm">%</span></span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Stats;
