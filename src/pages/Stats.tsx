import { useGoals } from '@/hooks/useGoals';
import { useHabitStats, Timeframe } from '@/hooks/useHabitStats';
import { StatsOverview } from '@/components/stats/StatsOverview';
import { ActivityHeatmap } from '@/components/stats/ActivityHeatmap';
import { TrendChart } from '@/components/stats/TrendChart';
import { HabitRadar } from '@/components/stats/HabitRadar';
import { DayOfWeekChart } from '@/components/stats/DayOfWeekChart';
import { PeriodComparison } from '@/components/stats/PeriodComparison';
import { CriticalAnalysis } from '@/components/stats/CriticalAnalysis';
import { MoodCorrelationChart } from '@/components/stats/MoodCorrelationChart';
import { Trophy } from 'lucide-react';
import { usePrivacy } from '@/context/PrivacyContext';
import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
        <div className="container mx-auto px-4 py-6 max-w-5xl animate-fade-in pb-24 space-y-6">
            {/* Background Glow */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className={cn("space-y-1 mb-4 shrink-0", isPrivacyMode && "blur-sm")}>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Le tue Statistiche</h1>
                <p className="text-muted-foreground font-light text-sm sm:text-base">Analisi dettagliata delle tue performance.</p>
            </div>

            <Tabs defaultValue="panoramica" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4 shrink-0">
                    <TabsTrigger value="panoramica" className="text-xs sm:text-sm">Panoramica</TabsTrigger>
                    <TabsTrigger value="trend" className="text-xs sm:text-sm">Trend</TabsTrigger>
                    <TabsTrigger value="analisi" className="text-xs sm:text-sm">Analisi</TabsTrigger>
                    <TabsTrigger value="abitudini" className="text-xs sm:text-sm">Abitudini</TabsTrigger>
                </TabsList>

                {/* Tab 1: Panoramica */}
                <TabsContent value="panoramica" className="mt-0 space-y-6">
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

                    <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                        <MoodCorrelationChart />
                    </div>

                    <div className="glass-panel rounded-3xl p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-display font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-sm bg-primary animate-pulse" />
                            Attività Recente
                        </h3>
                        <ActivityHeatmap data={stats.heatmapData} />
                    </div>
                </TabsContent>

                {/* Tab 2: Trend */}
                <TabsContent value="trend" className="mt-0 space-y-6">
                    <div className="glass-panel rounded-3xl p-4 sm:p-6 h-[350px] sm:h-[400px] flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h3 className="text-base sm:text-lg font-display font-semibold">Trend</h3>
                            <Tabs value={trendTimeframe} onValueChange={(v) => setTrendTimeframe(v as Timeframe)} className="w-full sm:w-auto">
                                <TabsList className="grid w-full grid-cols-4 sm:w-[300px]">
                                    <TabsTrigger value="weekly" className="text-xs">Sett</TabsTrigger>
                                    <TabsTrigger value="monthly" className="text-xs">Mese</TabsTrigger>
                                    <TabsTrigger value="annual" className="text-xs">Anno</TabsTrigger>
                                    <TabsTrigger value="all" className="text-xs">Tutto</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <TrendChart data={stats.trendData} />
                        </div>
                    </div>

                    <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                        <PeriodComparison comparisons={stats.comparisons} goals={goals} />
                    </div>
                </TabsContent>

                {/* Tab 3: Analisi */}
                <TabsContent value="analisi" className="mt-0 space-y-6">
                    <div className={cn("transition-all duration-300", isPrivacyMode && "blur-sm")}>
                        <CriticalAnalysis criticalHabits={stats.criticalHabits} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className={cn("glass-panel rounded-3xl p-4 sm:p-6 h-[300px] sm:h-[350px] flex flex-col transition-all duration-300", isPrivacyMode && "blur-sm")}>
                            <h3 className="text-base sm:text-lg font-display font-semibold mb-3">Focus Abitudini</h3>
                            <div className="flex-1 w-full min-h-0">
                                <HabitRadar stats={stats.habitStats} />
                            </div>
                        </div>
                        <div className="glass-panel rounded-3xl p-4 sm:p-6 h-[300px] sm:h-[350px] flex flex-col">
                            <div className="mb-3">
                                <h3 className="text-base sm:text-lg font-display font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-sm bg-primary animate-pulse" />
                                    Costanza Settimanale
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Scopri in quali giorni sei più produttivo.</p>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <DayOfWeekChart data={stats.weekdayStats} />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 4: Abitudini */}
                <TabsContent value="abitudini" className="mt-0">
                    <div className={cn("glass-panel rounded-3xl p-4 sm:p-6 transition-all duration-300", isPrivacyMode && "blur-sm")}>
                        <h3 className="text-base sm:text-lg font-display font-semibold mb-4 sm:mb-6">Dettagli Abitudini</h3>
                        <div className="space-y-3">
                            {stats.habitStats.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">Nessuna abitudine tracciata ancora.</p>
                            ) : (
                                [...stats.habitStats].sort((a, b) => b.completionRate - a.completionRate).map(habit => {
                                    const criticalStat = stats.criticalHabits.find(c => c.habitId === habit.id);
                                    return (
                                        <div key={habit.id} className="glass-card rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 group">
                                            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shrink-0" style={{ color: habit.color, borderColor: `${habit.color}40`, boxShadow: `0 0 20px ${habit.color}10` }}>
                                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ backgroundColor: habit.color }} />
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="font-semibold text-foreground text-base sm:text-lg truncate block">{habit.title}</span>
                                                    <div className="h-1 w-16 sm:w-20 bg-secondary rounded-full mt-1 overflow-hidden">
                                                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${habit.completionRate}%`, backgroundColor: habit.color }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-6 text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="flex flex-col items-center sm:items-end">
                                                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5 flex items-center gap-1">
                                                        <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" /> Best
                                                    </span>
                                                    <span className="font-mono text-base sm:text-lg font-bold text-foreground">{habit.longestStreak}<span className="text-[10px] sm:text-xs font-sans font-normal opacity-50">gg</span></span>
                                                </div>
                                                <div className="flex flex-col items-center sm:items-end">
                                                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">Serie</span>
                                                    <span className="font-mono text-base sm:text-lg font-bold text-foreground">{habit.currentStreak}<span className="text-[10px] sm:text-xs font-sans font-normal opacity-50">gg</span></span>
                                                </div>
                                                <div className="flex flex-col items-center sm:items-end">
                                                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">Rate</span>
                                                    <span className="font-mono text-base sm:text-lg font-bold text-foreground">{habit.completionRate}<span className="text-[10px] sm:text-sm">%</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Stats;
