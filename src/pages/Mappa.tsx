import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HexHeatmap } from '@/components/HexHeatmap';
import { Starfield } from '@/components/Starfield';
import { useReadingTracker } from '@/hooks/useReadingTracker';
import { useReadingStats } from '@/hooks/useReadingStats';

const Mappa = () => {
  const { records } = useReadingTracker();
  const stats = useReadingStats(records);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = stats.yearlyStats.length > 0
    ? stats.yearlyStats.map(y => y.year)
    : [currentYear];

  const selectedYearStats = stats.yearlyStats.find(y => y.year === selectedYear);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl animate-fade-in relative min-h-screen">

      <div className="glass-panel rounded-3xl p-4 sm:p-8 space-y-8 relative overflow-hidden min-h-[600px] border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
        {/* Background Effects */}
        <Starfield />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 drop-shadow-sm">
              Mappa Stellare
            </h1>
            <p className="text-muted-foreground font-light text-lg">
              Il tuo viaggio attraverso l'anno
            </p>
          </div>
          <Select
            value={selectedYear.toString()}
            onValueChange={(v) => setSelectedYear(parseInt(v))}
          >
            <SelectTrigger className="w-full sm:w-32 bg-white/5 border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Heatmap */}
        <div className="relative z-10 p-2 sm:p-6 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm shadow-inner overflow-hidden">
          <HexHeatmap records={records} year={selectedYear} />
        </div>

        {/* Stats Cards */}
        {selectedYearStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="glass-card rounded-2xl p-6 text-center group cursor-default hover:bg-white/5 transition-all border border-white/5 hover:border-success/30">
              <p className="text-4xl sm:text-5xl font-mono text-success font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{selectedYearStats.totalDaysRead}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Missioni Completate</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center group cursor-default hover:bg-white/5 transition-all border border-white/5 hover:border-destructive/30">
              <p className="text-4xl sm:text-5xl font-mono text-destructive font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{selectedYearStats.totalDaysMissed}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Missioni Fallite</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center group cursor-default hover:bg-white/5 transition-all border border-white/5 hover:border-primary/30">
              <p className="text-4xl sm:text-5xl font-mono text-primary font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">{selectedYearStats.longestStreak}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Serie Record</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center group cursor-default hover:bg-white/5 transition-all border border-white/5 hover:border-white/30">
              <p className="text-4xl sm:text-5xl font-mono text-foreground font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{selectedYearStats.percentage}%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Tasso Successo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mappa;
