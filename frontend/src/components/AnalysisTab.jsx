import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight, 
  Code2, 
  Sliders, 
  Activity, 
  Lightbulb 
} from 'lucide-react'

export default function AnalysisTab({ setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-[9px] font-bold text-brand-indigo tracking-wider uppercase mb-3.5">
          <Sparkles className="w-3 h-3 animate-pulse" />
          AI ANALYSIS
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
          Weakness Analysis
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 leading-relaxed">
          Identifying your largest growth blockers. Our neural analysis indicates that your algorithmic efficiency is constrained by specific pattern recognition gaps in dynamic contexts.
        </p>
      </section>

      {/* STRENGTHS & WEAKNESSES ROW */}
      <section className="glass-card rounded-[24px] p-6 space-y-6">
        
        {/* Strengths Sub-section */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-500">STRENGTHS</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Arrays</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Mastered
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 block text-right font-mono">92% Proficiency</span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Trees</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Mastered
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 block text-right font-mono">82% Proficiency</span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-900 pt-6">
          <div className="flex items-center gap-2 mb-4 text-brand-purple">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-500">WEAKNESSES</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Dynamic Programming</span>
                <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                  Struggling
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '34%' }} />
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 block text-right font-mono">34% Proficiency</span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Backtracking</span>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Impediment
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '48%' }} />
              </div>
              <span className="text-[9px] text-zinc-400 mt-1 block text-right font-mono">48% Proficiency</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAX IMPACT CARD */}
      <section className="glass-card rounded-[24px] p-6 relative overflow-hidden bg-brand-indigo/5 border border-brand-indigo/15">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              MAX IMPACT
            </span>
            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Next Priority</h3>
          </div>
        </div>

        <p className="text-zinc-800 dark:text-zinc-200 text-sm mb-6 leading-relaxed">
          Focus on <strong className="text-zinc-950 dark:text-white font-bold">DP Optimization</strong> to gain approx. <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+85 ELO</strong> points this week.
        </p>

        <button 
          className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-indigo/15 hover:shadow-brand-indigo/35 flex items-center justify-center gap-2 text-sm"
          onClick={() => setActiveTab('coach')}
        >
          START DRILL
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* GROWTH VELOCITY */}
      <section className="glass-card rounded-[24px] p-6">
        <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block mb-4 font-mono">
          GROWTH VELOCITY
        </span>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">12.4%</span>
          <div>
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold block">
              +2.1% week over week
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">Consistency: HIGH</span>
          </div>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div className="bg-brand-indigo h-2 rounded-full" style={{ width: '68%' }} />
        </div>
      </section>

      {/* CRITICAL BOTTLENECKS */}
      <section className="space-y-4">
        <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block font-mono">
          CRITICAL BOTTLENECKS
        </span>

        <div className="space-y-3">
          {/* Bottleneck 1 */}
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-brand-purple">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Dynamic Programming</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Multi-state optimization</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-rose-500 font-mono">9.2 SEVERITY</span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block">+42 Rating Potential</span>
            </div>
          </div>

          {/* Bottleneck 2 */}
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
                <Sliders className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Backtracking</h4>
                <p className="text-zinc-500 text-xs mt-0.5">State-space search pruning</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-amber-500 font-mono">6.5 SEVERITY</span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block">+28 Rating Potential</span>
            </div>
          </div>

          {/* Bottleneck 3 */}
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-500">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Graphs (DFS/BFS)</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Cycle detection & connectivity</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-blue-500 font-mono">4.1 SEVERITY</span>
              <span className="text-[10px] text-zinc-400 mt-0.5 block">+15 Rating Potential</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROOT CAUSE ANALYSIS */}
      <section className="glass-card rounded-[24px] p-6 space-y-6">
        <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block font-mono">
          ROOT CAUSE ANALYSIS
        </span>

        <div className="space-y-4">
          <div className="border-l-[3px] border-brand-purple pl-4">
            <h4 className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-1 font-mono">
              STATE DEFINITION GAP
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
              You struggle to define the optimal state variables in 2D DP problems, often leading to O(N^3) solutions where O(N^2) is possible.
            </p>
          </div>

          <div className="border-l-[3px] border-rose-500 pl-4">
            <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1 font-mono">
              PRUNING INEFFICIENCY
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
              In backtracking, you are identifying base cases correctly but missing early termination conditions, causing TLE on hard constraints.
            </p>
          </div>

          <div className="border-l-[3px] border-blue-500 pl-4">
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 font-mono">
              SUBPROBLEM OVERLAP
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
              High difficulty in identifying when a problem can be broken down into recursive sub-structures versus iterative greedy approaches.
            </p>
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-zinc-100 dark:bg-zinc-950/75 border border-zinc-200 dark:border-zinc-900 rounded-xl p-3.5 flex items-start gap-2.5 mt-4">
          <Lightbulb className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
          <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 leading-normal">
            <strong>Tip:</strong> Practice translating recursive relation equations to bottom-up tabular DP.
          </p>
        </div>
      </section>
    </div>
  )
}
