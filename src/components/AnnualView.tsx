
import { useState } from 'react';
import { format, isSameDay, subDays, getDay, getDate, eachDayOfInterval, startOfYear, endOfYear } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Goal, GoalLogsMap } from '@/types/goals';
import { DayDetailsModal } from './DayDetailsModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnnualViewProps {
    habits: Goal[];
    records: GoalLogsMap;
    onToggleHabit: (date: Date, habitId: string) => void;
    isPrivacyMode?: boolean;
}

export function AnnualView({ habits, records, onToggleHabit, isPrivacyMode = false }: AnnualViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const year = currentDate.getFullYear();
    const today = new Date();

    const goToPrevYear = () => setCurrentDate(new Date(year - 1, 0, 1));
    const goToNextYear = () => setCurrentDate(new Date(year + 1, 0, 1));
    const goToThisYear = () => setCurrentDate(new Date());

    const isToday = (date: Date) => isSameDay(today, date);
    const isFuture = (date: Date) => date > today;

    // Generate all days for the current year
    const daysInYear = eachDayOfInterval({
        start: startOfYear(currentDate),
        end: endOfYear(currentDate)
    });

    const renderDays = () => {
        return daysInYear.map((date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dayRecord = records[dateKey] || {};
            const future = isFuture(date);
            const dayOfMonth = getDate(date);
            const formattedDate = format(date, 'd MMMM yyyy', { locale: it });

            // Filter habits valid for this date
            const validHabits = habits.filter(h => {
                const isStarted = h.start_date <= dateKey;
                const isNotEnded = !h.end_date || h.end_date >= dateKey;
                return isStarted && isNotEnded;
            });

            // Calculate daily progress
            const completedCount = validHabits.filter(h => dayRecord[h.id] === 'done').length;
            const missedCount = validHabits.filter(h => dayRecord[h.id] === 'missed').length;
            const markedCount = completedCount + missedCount;

            const totalHabits = validHabits.length;
            let completionPct = 0;
            if (totalHabits > 0) {
                completionPct = completedCount / totalHabits;
            }

            let style = {};
            const hasActivity = markedCount > 0;

            if (hasActivity && totalHabits > 0) {
                const hue = Math.round(completionPct * 142); // 0 to 142
                style = {
                    backgroundColor: `hsl(${hue}, 70%, 10%, 0.6)`,
                    borderColor: `hsl(${hue}, 80%, 40%, 0.4)`,
                };
            }

            return (
                <TooltipProvider key={dateKey}>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => !future && setSelectedDate(date)}
                                disabled={future}
                                style={style}
                                className={cn(
                                    "aspect-square w-full rounded-[2px] flex items-center justify-center transition-all duration-300 relative border border-white/5 hover:border-white/40 hover:scale-110 hover:z-10",
                                    future && "opacity-10 cursor-not-allowed border-none bg-white/5",
                                    !future && !hasActivity && "bg-white/5",
                                    isToday(date) && !hasActivity && "ring-1 ring-primary/50 bg-primary/10",
                                )}
                            >
                                {/* Only show day number if it's the 1st of the month, as a marker */}
                                {dayOfMonth === 1 && (
                                    <span className="text-[0.5rem] text-muted-foreground font-bold absolute top-0.5 left-0.5 leading-none">
                                        {format(date, 'MMM', { locale: it }).toUpperCase()}
                                    </span>
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-background/90 backdrop-blur border-white/10 text-xs">
                            <p className="capitalize font-medium">{formattedDate}</p>
                            {validHabits.length > 0 && (
                                <p className="text-muted-foreground">{completedCount}/{validHabits.length} completate</p>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        });
    };

    return (
        <>
            <div className="w-full h-full p-2 sm:p-6 animate-scale-in flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 shrink-0">
                    <Button variant="ghost" size="icon" onClick={goToPrevYear}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-display font-bold">
                            <span className="text-foreground">{year}</span>
                        </h2>
                        <Button variant="ghost" size="icon" onClick={goToThisYear} className="h-8 w-8 ml-2 opacity-0 hover:opacity-100 transition-opacity">
                            <RotateCcw className="h-3 w-3" />
                        </Button>
                    </div>

                    <Button variant="ghost" size="icon" onClick={goToNextYear}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Continuous Grid */}
                {/* 
                  365 days. 
                  On desktop: maybe ~30 columns? 365/30 = 12 rows. 
                  On mobile: maybe ~10 columns? 365/10 = 36 rows.
                  CSS Grid auto-fill/fit is best.
                  Let's try a responsive grid with min-width for cells.
                */}
                <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar pr-2">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1 p-1">
                        {renderDays()}
                    </div>
                </div>
            </div>

            <DayDetailsModal
                isOpen={!!selectedDate}
                onClose={() => setSelectedDate(null)}
                date={selectedDate}
                habits={habits}
                records={records}
                onToggleHabit={(habitId) => selectedDate && onToggleHabit(selectedDate, habitId)}
                isPrivacyMode={isPrivacyMode}
                readonly={selectedDate ? !(isSameDay(selectedDate, new Date()) || (isSameDay(selectedDate, subDays(new Date(), 1)) && new Date().getHours() < 12)) : true}
            />
        </>
    );
}
