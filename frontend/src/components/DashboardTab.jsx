import { 
  Sparkles, 
  Calendar, 
  TrendingUp 
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'

// Mock Data for Contest Rating Graph
const ratingHistory = [
  { week: 'Wk 1', rating: 1500 },
  { week: 'Wk 2', rating: 1480 },
  { week: 'Wk 3', rating: 1530 },
  { week: 'Wk 4', rating: 1510 },
  { week: 'Wk 5', rating: 1590 },
  { week: 'Wk 6', rating: 1680 },
  { week: 'Wk 7', rating: 1720 },
  { week: 'Wk 8', rating: 1784 }
]

// Mock Data for Topic Distribution (Donut Chart)
const topicData = [
  { name: 'Arrays', value: 45, color: '#3b82f6' },
  { name: 'Graphs', value: 30, color: '#10b981' },
  { name: 'DP', value: 25, color: '#8b5cf6' }
]

// Mock Data for Solved Trend (30D) (Bar Chart)
const solvedTrendData = [
  { name: 'W1.1', solved: 4, active: false },
  { name: 'W1.2', solved: 7, active: false },
  { name: 'W2.1', solved: 3, active: false },
  { name: 'W2.2', solved: 9, active: false },
  { name: 'W3.1', solved: 6, active: true },
  { name: 'W3.2', solved: 8, active: true },
  { name: 'W4.1', solved: 10, active: true },
  { name: 'W4.2', solved: 5, active: false },
  { name: 'W4.3', solved: 4, active: false },
  { name: 'W4.4', solved: 8, active: false }
]

export default function DashboardTab({ isDark }) {
  return (
    <div className="space-y-6">
      {/* Profile Status Header */}
      <section className="mb-2">
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold">SYSTEM STATUS</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white mt-1">
          Hello, Coder.
        </h1>
      </section>

      {/* TOP METRICS ROW */}
      <section className="grid grid-cols-2 gap-4">
        {/* Solved Card */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors" />
          <div>
            <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">SOLVED</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white mt-1.5">247</div>
          </div>
          <div className="flex gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
            <span className="text-emerald-600 dark:text-emerald-500 font-medium">120 E</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-500 font-medium">90 M</span>
            <span>•</span>
            <span className="text-rose-600 dark:text-rose-500 font-medium">37 H</span>
          </div>
        </div>

        {/* Rating Card */}
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors" />
          <div>
            <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">RATING</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white mt-1.5">1,784</div>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            Top 4.2% globally
          </div>
        </div>
      </section>

      {/* AI INSIGHT ACCENT BANNER */}
      <section>
        <div className="glass-card rounded-2xl p-5 border-l-[3.5px] border-l-brand-indigo relative overflow-hidden bg-zinc-100/50 dark:bg-zinc-950/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs font-bold text-brand-indigo tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI INSIGHT: OPTIMIZATION NEEDED
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            Your Dynamic Programming efficiency is peaking, but Graph traversal remains a bottleneck in high-stress contests. Recommend focus on DFS/BFS variations.
          </p>
        </div>
      </section>

      {/* MAIN ANALYSIS CARD STACK */}
      <section className="space-y-6">
        {/* Contest Rating Graph */}
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-64">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold">CONTEST RATING</span>
              <div className="text-xl font-extrabold text-zinc-950 dark:text-white flex items-baseline gap-1.5 mt-0.5">
                1,784
                <span className="text-emerald-600 dark:text-emerald-500 text-xs font-bold flex items-center">
                  ↑ 42
                </span>
              </div>
            </div>
            <div className="flex gap-0.5 items-end h-6 pb-0.5">
              <div className="w-1 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              <div className="w-1 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              <div className="w-1 h-5 bg-brand-indigo rounded-sm" />
            </div>
          </div>

          <div className="h-36 w-full -mx-4 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ratingHistory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    background: isDark ? '#09090b' : '#ffffff', 
                    borderColor: isDark ? '#27272a' : '#e4e4e7',
                    borderRadius: '8px',
                    color: isDark ? '#f4f4f5' : '#18181b',
                    fontSize: '11px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="rating" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#ratingGradient)" 
                  dot={{ r: 3, stroke: '#818cf8', strokeWidth: 1.5, fill: isDark ? '#030712' : '#ffffff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Distribution Donut Chart */}
        <div className="glass-card rounded-2xl p-5">
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block mb-4">
            TOPIC DISTRIBUTION
          </span>
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <div className="absolute flex flex-col items-center justify-center z-10 text-center">
                <span className="text-xl font-extrabold text-zinc-950 dark:text-white leading-none">14</span>
                <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">TAGS</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={58}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 font-mono max-w-[200px]">
              {topicData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-655 dark:text-zinc-300">{item.name}</span>
                  </div>
                  <span className="text-zinc-800 dark:text-zinc-400 font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solved Trend 30D Bar Chart */}
        <div className="glass-card rounded-2xl p-5">
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block mb-4">
            SOLVED TREND (30D)
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solvedTrendData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <Tooltip 
                  contentStyle={{ 
                    background: isDark ? '#09090b' : '#ffffff', 
                    borderColor: isDark ? '#27272a' : '#e4e4e7',
                    borderRadius: '8px',
                    color: isDark ? '#f4f4f5' : '#18181b',
                    fontSize: '11px'
                  }} 
                />
                <Bar dataKey="solved" radius={[3, 3, 0, 0]}>
                  {solvedTrendData.map((entry, idx) => (
                    <Cell 
                      key={`bar-cell-${idx}`} 
                      fill={entry.active ? '#3b82f6' : (isDark ? '#27272a' : '#e4e4e7')} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2 px-1">
            <span>WK 1</span>
            <span>WK 2</span>
            <span>WK 3</span>
            <span>CURRENT</span>
          </div>
        </div>

        {/* Upcoming Contest registration box */}
        <div>
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block mb-3">
            UPCOMING CONTEST
          </span>
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between bg-zinc-100/40 dark:bg-zinc-950/25 border-zinc-200 dark:border-zinc-900">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Weekly Contest 402</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Starts in 14h 22m</p>
              </div>
            </div>
            <button 
              className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-brand-indigo/10"
              onClick={() => alert('Registered successfully for Weekly Contest 402!')}
            >
              REGISTER
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
