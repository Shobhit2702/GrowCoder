import { useState } from 'react'
import { 
  Calendar, 
  TrendingUp,
  Cpu,
  CheckCircle2
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid
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
  { name: 'Arrays', value: 45, color: '#2563eb' },
  { name: 'DP', value: 25, color: '#8b5cf6' },
  { name: 'Graphs', value: 30, color: '#10b981' }
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
  const [ratingFilter, setRatingFilter] = useState('1M')

  // Custom Dot for Rating History peak point
  const renderCustomDot = (props) => {
    const { cx, cy, index } = props;
    if (index === 7) { // Wk 8 is the peak at rating 1784
      return (
        <g key="rating-peak-dot">
          <circle cx={cx} cy={cy} r={8} fill="#2563eb" opacity={0.4} className="animate-pulse" />
          <circle cx={cx} cy={cy} r={4.5} fill="#2563eb" stroke="#ffffff" strokeWidth={1.5} />
        </g>
      )
    }
    // Subtle hover/resting blue dots for other weeks
    return (
      <circle key={`rating-dot-${index}`} cx={cx} cy={cy} r={2.5} fill="#2563eb" opacity={0.65} />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Profile Status Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#171c26]/60 pb-5 mb-2 shrink-0">
        <div>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono font-bold">SYSTEM STATUS</span>
          <h1 className="font-display font-black text-4xl text-white mt-1.5 flex items-center">
            Hello, Coder.<span className="text-[#3b82f6] animate-pulse">_</span>
          </h1>
        </div>
        <div className="mt-3.5 sm:mt-0 flex items-center bg-black/45 border border-[#171c26] px-4 py-2 rounded-full text-[10px] font-mono text-zinc-400 gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200">SYSTEM.STATUS: LIVE</span>
          <span className="text-zinc-700">|</span>
          <span>LATENCY: 12ms</span>
        </div>
      </section>

      {/* Main Grid Scaffolding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN: Main Metrics & Technical Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TOP METRICS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Card 1: Solved */}
            <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-4 flex flex-col justify-between h-[105px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
              
              <div>
                <span className="text-[8.5px] tracking-wider text-zinc-500 uppercase font-mono font-bold">SOLVED</span>
                <div className="text-2xl font-display font-black text-white mt-1 leading-none">768</div>
              </div>
              <div className="text-[9.5px] text-emerald-500 font-mono font-semibold">
                +12 this week
              </div>
            </div>

            {/* Card 2: Rating */}
            <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-4 flex flex-col justify-between h-[105px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
              
              <div>
                <span className="text-[8.5px] tracking-wider text-zinc-500 uppercase font-mono font-bold">RATING</span>
                <div className="text-2xl font-display font-black text-white mt-1 leading-none">1784</div>
              </div>
              <div className="text-[9.5px] text-zinc-500 font-mono">
                Top 5%
              </div>
            </div>

            {/* Card 3: Consistency */}
            <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-4 flex flex-col justify-between h-[105px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
              
              <div>
                <span className="text-[8.5px] tracking-wider text-zinc-500 uppercase font-mono font-bold">CONSISTENCY</span>
                <div className="text-2xl font-display font-black text-white mt-1 leading-none">120</div>
              </div>
              <div className="text-[9.5px] text-zinc-500 font-mono">
                days
              </div>
            </div>

            {/* Card 4: Growth */}
            <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-4 flex flex-col justify-between h-[105px] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
              
              <div>
                <span className="text-[8.5px] tracking-wider text-zinc-500 uppercase font-mono font-bold">GROWTH</span>
                <div className="text-2xl font-display font-black text-white mt-1 leading-none">91/100</div>
              </div>
              <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden border border-zinc-800/40">
                <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

          </div>

          {/* Contest Rating Graph Panel */}
          <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between h-[360px] shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono font-bold">CONTEST RATING HISTORY</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-1 flex items-center gap-1.5">
                  LATEST: <span className="font-bold text-white">1,784</span> <span className="text-emerald-500 font-bold flex items-center gap-0.5">↑ 42</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 font-mono text-[9px]">
                {['1M', '6M', 'ALL'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setRatingFilter(f)}
                    className={`px-2.5 py-0.5 rounded cursor-pointer transition-colors ${
                      ratingFilter === f 
                        ? 'bg-[#2563eb] text-white font-bold' 
                        : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/60'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-56 w-full -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ratingHistory} margin={{ top: 15, right: 15, left: -25, bottom: 5 }}>
                  <defs>
                    <linearGradient id="cyberRatingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#171c26" strokeDasharray="3 3" opacity={0.35} vertical={false} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#09090b', 
                      borderColor: '#171c26',
                      borderRadius: '8px',
                      color: '#f4f4f5',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#2563eb" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#cyberRatingGradient)" 
                    dot={renderCustomDot}
                    activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Simulated Command-line footer inside line chart */}
            <div className="flex justify-between items-center border-t border-[#171c26]/60 pt-3 mt-1 text-[9.5px] font-mono">
              <div>
                <span className="block text-[7.5px] text-zinc-555 font-bold uppercase tracking-wider">AVERAGE LATENCY</span>
                <span className="text-[#3b82f6] font-bold">4.2ns</span>
              </div>
              <div className="text-zinc-650 select-none">
                root@growcode:~/analytics# tail -n 3 metrics.log
              </div>
            </div>

          </div>

          {/* Solved Trend 30D Bar Chart Panel */}
          <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />
            
            <div className="flex justify-between items-center mb-3.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#2563eb] text-[10px]">📊</span>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">TACTICAL_SOLVED_TREND.LOG</span>
              </div>
              <span className="text-[8px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 font-bold">[DATA_SYNC_ACTIVE]</span>
            </div>
            
            <div className="text-[9.5px] font-mono text-zinc-500 mb-2">PERIOD: LAST 30 DAYS</div>

            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={solvedTrendData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#09090b', 
                      borderColor: '#171c26',
                      borderRadius: '8px',
                      color: '#f4f4f5',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }} 
                  />
                  <Bar dataKey="solved" radius={[3, 3, 0, 0]} maxBarSize={12}>
                    {solvedTrendData.map((entry, idx) => (
                      <Cell 
                        key={`cyber-bar-cell-${idx}`} 
                        fill={entry.active ? '#2563eb' : '#1f2937'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono tracking-widest uppercase mt-3 px-2">
              <span>WK 1</span>
              <span>WK 2</span>
              <span>WK 3</span>
              <span>CURRENT</span>
            </div>

            {/* Simulated log footer inside bar chart */}
            <div className="flex justify-between items-center border-t border-[#171c26]/60 pt-3 mt-3 text-[9px] font-mono text-zinc-600">
              <span>STATUS: OPTIMIZED</span>
              <span>REFRESH_RATE: 500ms</span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: AI Coach Insights & Topic Distributions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* AI INSIGHT OPTIMIZATION NEEDED */}
          <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl space-y-3.5">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />
            
            <div className="flex items-center gap-2 font-mono">
              <Cpu className="w-4 h-4 text-[#3b82f6] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase leading-none mt-0.5">AI INSIGHT: OPTIMIZATION NEEDED</span>
            </div>

            <p className="text-zinc-400 text-[12px] leading-relaxed">
              Your <strong className="text-blue-400 font-semibold">Dynamic Programming efficiency</strong> is peaking, but Graph traversal remains a bottleneck in high-stress contests. Recommend focus on DFS/BFS variations.
            </p>

            <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded px-2.5 py-1.5 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SUGGESTED: PROJECT-AETHER-MODULE-04</span>
            </div>
          </div>

          {/* Topic Distribution Donut Chart */}
          <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />
            
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono block mb-4 font-bold">TOPIC_DISTRIBUTION.JSON</span>
            
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <div className="absolute flex flex-col items-center justify-center z-10 text-center">
                  <span className="text-3xl font-display font-black text-white leading-none">14</span>
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase mt-1">TAGS</span>
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
                        <Cell key={`cyber-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1 space-y-3">
                {topicData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-zinc-450">{item.name}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Contest registration box */}
          <div className="bg-[#0b0e14]/50 border border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />
            
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono block mb-4 font-bold">UPCOMING CONTEST</span>
            
            <div className="bg-[#080a10] border border-[#171c26] rounded-lg p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center text-[#3b82f6]">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div className="text-left font-mono">
                  <h4 className="text-xs font-bold text-white">Weekly Contest 402</h4>
                  <p className="text-[9.5px] text-zinc-500 mt-1">Starts in 14h 22m</p>
                </div>
              </div>
              <button 
                className="bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[9.5px] px-3.5 py-2 rounded transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-600/15"
                onClick={() => alert('Registered successfully for Weekly Contest 402!')}
              >
                REGISTER
              </button>
            </div>
          </div>

          {/* Console readout status lines */}
          <div className="pt-4 border-t border-[#171c26]/60 flex justify-between items-end font-mono text-[9.5px] text-zinc-500 leading-relaxed shrink-0">
            <div className="space-y-0.5 text-left">
              <div className="text-zinc-650">&gt; Fetching remote_origin...</div>
              <div className="text-zinc-650">&gt; Synchronization complete.</div>
              <div className="text-emerald-500">&gt; Neural Link: STABLE [103%]</div>
            </div>
            <div className="space-y-0.5 text-right font-semibold">
              <div>MEMORY_USAGE: 4.2GB / 16GB</div>
              <div>CPU_THREADS: 8/8 ACTIVE</div>
              <div className="text-zinc-650">SESSION_ID: GH_8273_XK_01</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
