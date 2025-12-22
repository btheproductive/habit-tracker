import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HexHeatmap } from '@/components/HexHeatmap';
import { Starfield } from '@/components/Starfield';
import { useReadingTracker } from '@/hooks/useReadingTracker';
import { useReadingStats } from '@/hooks/useReadingStats';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  Cell, AreaChart, Area, CartesianGrid
} from 'recharts';
import { Calendar, TrendingUp, Trophy, Target } from 'lucide-react';

const Mappa = () => {
  const { records } = useReadingTracker();
  const stats = useReadingStats(records);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = stats.yearlyStats.length > 0
    ? stats.yearlyStats.map(y => y.year)
    : [currentYear];

  const selectedYearStats = stats.yearlyStats.find(y => y.year === selectedYear);

  // Prepare data for charts
  const monthlyData = useMemo(() => {
    if (!selectedYearStats) return [];
    return selectedYearStats.monthlyBreakdown.map(m => ({
      name: m.name.substring(0, 3), // Short name
      full: m.name,
      completed: m.daysRead,
      missed: m.daysMissed,
      total: m.daysTotal,
      percentage: m.percentage
    }));
  }, [selectedYearStats]);

  // Daily distribution for selected year
  const dailyDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat
    const labels = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

    if (!records) return []; // Guard

    Object.entries(records).forEach(([dateStr, status]) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === selectedYear && status === 'done') {
        dist[date.getDay()]++;
      }
    });

    return labels.map((label, i) => ({
      day: label,
      count: dist[i],
    }));
  }, [records, selectedYear]);

  // Rotate to start Mon (index 1 is Mon, 0 is Sun)
  const dailyDistributionMon = useMemo(() => {
    if (dailyDistribution.length === 0) return [];
    const sunday = dailyDistribution[0];
    const rest = dailyDistribution.slice(1);
    return [...rest, sunday];
  }, [dailyDistribution]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1600px] animate-fade-in relative min-h-screen">

      {/* Background Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden min-h-[800px] border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
        <Starfield />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 drop-shadow-sm">
              Mappa Stellare
            </h1>
            <p className="text-muted-foreground font-light text-lg">
              Analisi avanzata delle tue performance temporali
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

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 relative z-10">

          {/* Heatmap Section - Takes 3 columns */}
          <div className="xl:col-span-3 space-y-4">
            <div className="p-4 sm:p-6 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm shadow-inner min-h-[300px] flex items-center justify-center overflow-x-auto">
              <HexHeatmap records={records} year={selectedYear} />
            </div>

            {/* Monthly Analytics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Andamento Mensile
                  </h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Attività</span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      />
                      <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                        {monthlyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.percentage > 70 ? 'rgb(34, 197, 94)' : 'rgba(255, 255, 255, 0.3)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Giorni più Attivi
                  </h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Consistency</span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyDistributionMon}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="day" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#818cf8" fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar - Takes 1 column */}
          <div className="xl:col-span-1 space-y-4">
            {/* Hero Metric */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-primary/20 to-transparent relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-32 h-32" />
              </div>
              <p className="text-sm text-primary font-bold uppercase tracking-widest mb-1">Successo Totale</p>
              <p className="text-6xl font-black font-display text-white mb-2">
                {selectedYearStats?.percentage || 0}%
              </p>
              <p className="text-sm text-muted-foreground">
                Hai completato {selectedYearStats?.totalDaysRead || 0} missioni su {selectedYearStats?.totalDaysMarked || 0} totali quest'anno.
              </p>
            </div>

            {/* Sub Metrics Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-card rounded-xl p-5 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/20 text-success">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Serie Migliore</p>
                  <p className="text-2xl font-mono font-bold text-white">{selectedYearStats?.longestStreak || 0} <span className="text-xs font-normal text-muted-foreground">giorni</span></p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4">
                <div className="p-3 rounded-full bg-destructive/20 text-destructive">
                  <TrendingUp className="w-6 h-6 rotate-180" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Giorni Saltati</p>
                  <p className="text-2xl font-mono font-bold text-white">{selectedYearStats?.totalDaysMissed || 0} <span className="text-xs font-normal text-muted-foreground">giorni</span></p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-xs text-muted-foreground uppercase font-bold mb-3">Media Settimanale</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-mono font-bold text-white">{selectedYearStats?.averagePerWeek || 0}</p>
                  <p className="text-xs text-muted-foreground mb-1">missioni / sett</p>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-primary/80 rounded-full"
                    style={{ width: `${Math.min(((selectedYearStats?.averagePerWeek || 0) / 7) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Mappa;
