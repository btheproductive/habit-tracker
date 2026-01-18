import { useMemo } from 'react';
import { format, startOfYear, addWeeks, differenceInWeeks, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Goal, GoalLogsMap } from '@/types/goals';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LifeViewProps {
    habits: Goal[];
    records: GoalLogsMap;
    isPrivacyMode?: boolean;
}

const BIRTH_YEAR = 2003;
const END_YEAR = 2088; // 85 years old
const WEEKS_PER_YEAR = 52;

export function LifeView({ habits, records, isPrivacyMode = false }: LifeViewProps) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentWeek = startOfWeek(today, { weekStartsOn: 1 });

    // Calculate the first week of goal tracking
    const firstTrackingDate = useMemo(() => {
        if (!habits || habits.length === 0) return today;

        const earliestDate = habits.reduce((earliest, goal) => {
            const goalStartDate = new Date(goal.start_date);
            return goalStartDate < earliest ? goalStartDate : earliest;
        }, today);

        return startOfWeek(earliestDate, { weekStartsOn: 1 });
    }, [habits, today]);

    // Generate data structure: years with weeks
    const yearsWithWeeks = useMemo(() => {
        const result = [];

        for (let year = BIRTH_YEAR; year <= END_YEAR; year++) {
            const weeks = [];
            const yearStart = startOfYear(new Date(year, 0, 1));

            for (let weekNum = 0; weekNum < WEEKS_PER_YEAR; weekNum++) {
                const weekStart = addWeeks(startOfWeek(yearStart, { weekStartsOn: 1 }), weekNum);
                weeks.push(weekStart);
            }

            result.push({ year, weeks });
        }

        return result;
    }, []);

    // Calculate statistics for each week
    const weekStats = useMemo(() => {
        const stats: Map<number, { completed: number; total: number; percentage: number }> = new Map();

        yearsWithWeeks.forEach(({ weeks }) => {
            weeks.forEach(weekStart => {
                const weekTimestamp = weekStart.getTime();

                // Get all dates in this week that have records
                let totalCompleted = 0;
                let totalPossible = 0;

                // Check 7 days of the week
                for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
                    const currentDay = new Date(weekStart);
                    currentDay.setDate(currentDay.getDate() + dayOffset);
                    const dateKey = format(currentDay, 'yyyy-MM-dd');

                    const dayRecord = records[dateKey];
                    if (!dayRecord) continue;

                    // Find habits valid for this date
                    const validHabits = habits.filter(h => {
                        const isStarted = h.start_date <= dateKey;
                        const isNotEnded = !h.end_date || h.end_date >= dateKey;
                        return isStarted && isNotEnded;
                    });

                    const completedCount = validHabits.filter(h => dayRecord[h.id] === 'done').length;

                    totalCompleted += completedCount;
                    totalPossible += validHabits.length;
                }

                const percentage = totalPossible > 0 ? (totalCompleted / totalPossible) : 0;
                stats.set(weekTimestamp, { completed: totalCompleted, total: totalPossible, percentage });
            });
        });

        return stats;
    }, [yearsWithWeeks, records, habits]);

    const renderWeek = (weekStart: Date, year: number) => {
        const weekTimestamp = weekStart.getTime();
        const currentWeekTimestamp = currentWeek.getTime();

        const isCurrentWeek = weekTimestamp === currentWeekTimestamp;
        const isFuture = weekStart > today;
        const isPreTracking = weekStart < firstTrackingDate;
        const stats = weekStats.get(weekTimestamp);
        const hasActivity = stats && stats.total > 0;

        const weekNumber = differenceInWeeks(weekStart, startOfYear(new Date(year, 0, 1))) + 1;

        let style: React.CSSProperties = {};

        if (isFuture) {
            // Future weeks - very subtle
            style = {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                opacity: 0.2,
            };
        } else if (isPreTracking) {
            // Pre-tracking weeks - light blue with reduced opacity
            style = {
                backgroundColor: 'hsl(200, 70%, 50%)',
                opacity: 0.3,
            };
        } else if (hasActivity) {
            // Weeks with activity - color based on performance
            const hue = Math.round(stats.percentage * 142); // 0 (red) to 142 (green)
            style = {
                backgroundColor: `hsl(${hue}, 70%, 40%)`,
            };
        } else {
            // No activity
            style = {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
            };
        }

        const weekLabel = format(weekStart, 'dd MMM yyyy', { locale: it });

        return (
            <TooltipProvider key={weekTimestamp}>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <div
                            style={style}
                            className={cn(
                                "w-full aspect-square rounded-sm transition-all duration-150 hover:scale-150 hover:z-10 hover:rounded-md",
                                isCurrentWeek && "ring-1 ring-primary shadow-[0_0_8px_rgba(255,255,255,0.4)]",
                                !isFuture && "hover:brightness-125",
                                isPrivacyMode && hasActivity && "blur-[1px]"
                            )}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-background/95 backdrop-blur border-white/10 text-xs">
                        <div className="space-y-1">
                            <p className="font-bold capitalize">{weekLabel}</p>
                            <p className="text-muted-foreground">Settimana {weekNumber} del {year}</p>
                            {isCurrentWeek && <p className="text-primary font-medium">Settimana corrente</p>}
                            {isFuture && <p className="text-muted-foreground">Futuro</p>}
                            {isPreTracking && !isFuture && <p className="text-blue-400">Pre-tracciamento</p>}
                            {hasActivity && (
                                <>
                                    <p className="text-muted-foreground">
                                        {stats.completed}/{stats.total} completati
                                    </p>
                                    <p className="text-muted-foreground">
                                        Performance: {Math.round(stats.percentage * 100)}%
                                    </p>
                                </>
                            )}
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    const totalYears = END_YEAR - BIRTH_YEAR + 1;
    const totalWeeks = totalYears * WEEKS_PER_YEAR;
    const currentAge = currentYear - BIRTH_YEAR;
    const weeksLived = differenceInWeeks(today, new Date(BIRTH_YEAR, 0, 1));
    const weeksRemaining = (85 * 52) - weeksLived;

    return (
        <div className="w-full h-full p-2 sm:p-4 animate-scale-in flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 shrink-0 gap-2">
                <div>
                    <h2 className="text-lg sm:text-xl font-display font-bold">
                        La Mia Vita Produttiva
                    </h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {BIRTH_YEAR} - {END_YEAR} • {totalWeeks.toLocaleString()} settimane
                    </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'hsl(200, 70%, 50%)', opacity: 0.3 }} />
                        <span className="text-muted-foreground">Pre-tracking</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm ring-1 ring-primary" style={{ backgroundColor: 'hsl(71, 70%, 40%)' }} />
                        <span className="text-muted-foreground">Attuale</span>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="mb-3 sm:mb-4 shrink-0 glass-card p-2 sm:p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-base sm:text-xl font-bold text-primary">{weeksLived.toLocaleString()}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Settimane Vissute</p>
                    </div>
                    <div>
                        <p className="text-base sm:text-xl font-bold text-foreground">{currentAge}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Anni</p>
                    </div>
                    <div>
                        <p className="text-base sm:text-xl font-bold text-muted-foreground/70">{weeksRemaining.toLocaleString()}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Settimane Rimanenti</p>
                    </div>
                </div>
            </div>

            {/* Grid Container - Years as rows, weeks as columns */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-[2px]">
                {yearsWithWeeks.map(({ year, weeks }) => (
                    <div key={year} className="flex items-center gap-1 sm:gap-2">
                        {/* Year Label */}
                        <div className="w-8 sm:w-10 shrink-0 text-[9px] sm:text-[10px] font-bold text-muted-foreground text-right">
                            {year}
                        </div>
                        {/* Weeks Grid */}
                        <div className="flex-1 grid gap-[1px] sm:gap-[2px]" style={{ gridTemplateColumns: `repeat(52, 1fr)` }}>
                            {weeks.map(weekStart => renderWeek(weekStart, year))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
