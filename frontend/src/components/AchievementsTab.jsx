import { 
  Award, 
  CheckCircle2, 
  BarChart3, 
  Flame, 
  Zap, 
  Gauge, 
  Trophy, 
  Sparkles, 
  Check, 
  Boxes, 
  Database, 
  Shield 
} from 'lucide-react'

export default function AchievementsTab() {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <section className="mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[9px] font-bold text-brand-purple tracking-wider uppercase mb-3.5">
          <Award className="w-3 h-3 animate-pulse" />
          RATING & ASCENT
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
          Achievements
        </h1>
      </section>

      {/* RANK INDICATOR CARD */}
      <section className="glass-card rounded-[24px] p-6 relative overflow-hidden bg-brand-indigo/5 border border-brand-indigo/15">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-baseline mb-3">
          <h2 className="font-display font-extrabold text-2xl text-zinc-900 dark:text-white">
            Knight
          </h2>
          <span className="text-xl font-extrabold text-brand-blue font-mono">
            1,450 <span className="text-xs text-zinc-400 font-semibold uppercase">ELO</span>
          </span>
        </div>

        {/* ELO Progress Meter */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden mb-3">
          <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: '70%' }} />
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-bold uppercase tracking-wider">
          <span>Next: Guardian</span>
          <span>XP 12,400 / 15,000</span>
        </div>
      </section>

      {/* QUICK METRICS GRID */}
      <section className="grid grid-cols-3 gap-3">
        {/* Metric 1 */}
        <div className="glass-card rounded-2xl p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
          <span className="block text-lg font-extrabold text-zinc-900 dark:text-white font-mono leading-none">412</span>
          <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-1.5">SOLVES</span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-2xl p-4 text-center">
          <BarChart3 className="w-5 h-5 text-brand-blue mx-auto mb-2" />
          <span className="block text-sm font-extrabold text-zinc-900 dark:text-white font-mono leading-none mt-1">Top 2%</span>
          <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-1.5">GLOBAL</span>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-2xl p-4 text-center">
          <Flame className="w-5 h-5 text-brand-purple mx-auto mb-2" />
          <span className="block text-lg font-extrabold text-zinc-900 dark:text-white font-mono leading-none">14</span>
          <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-widest mt-1.5">STREAK</span>
        </div>
      </section>

      {/* RECENT WINS SLIDER */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold font-mono">
            RECENT WINS
          </span>
          <button className="text-xs font-bold text-brand-indigo hover:underline" onClick={() => alert('Viewing all wins...')}>
            View All
          </button>
        </div>

        {/* Horizontal scroll container for wins */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {/* Win 1 */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-purple-500/40 bg-purple-500/5 shadow-lg shadow-purple-500/10 relative group cursor-pointer hover:border-purple-500 transition-colors">
            <div className="absolute inset-0.5 rounded-full border border-dashed border-purple-400/20" />
            <Zap className="w-5 h-5 text-purple-400" />
          </div>

          {/* Win 2 */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-brand-blue/50 bg-brand-blue/5 shadow-lg shadow-brand-blue/15 relative group cursor-pointer hover:border-brand-blue transition-colors">
            <div className="absolute inset-0.5 rounded-full border border-dashed border-blue-400/25" />
            <Gauge className="w-5 h-5 text-brand-blue" />
          </div>

          {/* Win 3 */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-emerald-500/40 bg-emerald-500/5 shadow-lg shadow-emerald-500/10 relative group cursor-pointer hover:border-emerald-500 transition-colors">
            <div className="absolute inset-0.5 rounded-full border border-dashed border-emerald-400/20" />
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Win 4 */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/10 relative group cursor-pointer hover:border-amber-500 transition-colors">
            <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-400/20" />
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      </section>

      {/* TECHNICAL ASCENT ROADMAP TIMELINE */}
      <section className="space-y-4">
        <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block font-mono">
          TECHNICAL ASCENT
        </span>

        {/* Vertical Timeline container */}
        <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-900 ml-3 space-y-6">
          
          {/* Timeline Node 1: Beginner */}
          <div className="relative">
            {/* Absolute Timeline Dot */}
            <span className="absolute -left-[31px] top-1.5 w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-zinc-50 dark:border-[#030712]">
              <Check className="w-2.5 h-2.5 stroke-[3px]" />
            </span>
            {/* Timeline Card */}
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Beginner</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Unlocked Jan 2024 - Rating: 800</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                +100 ELO
              </span>
            </div>
          </div>

          {/* Timeline Node 2: Apprentice */}
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-zinc-50 dark:border-[#030712]">
              <Check className="w-2.5 h-2.5 stroke-[3px]" />
            </span>
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Apprentice</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Unlocked Mar 2024 - Rating: 1100</p>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                +200 ELO
              </span>
            </div>
          </div>

          {/* Timeline Node 3: Knight (ACTIVE HIGHLIGHT) */}
          <div className="relative">
            <span className="absolute -left-[32px] top-1.5 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center border-2 border-zinc-50 dark:border-[#030712] shadow-md shadow-brand-blue/35">
              <span className="w-2 h-2 rounded-full bg-white" />
            </span>
            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-brand-blue shadow-lg shadow-brand-blue/5 bg-zinc-50/50 dark:bg-zinc-900/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-sm font-bold text-zinc-955 dark:text-white">Knight</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">Current Rating: 1450 (Range: 1400 - 1599)</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[8px] font-extrabold text-brand-blue bg-brand-blue/15 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    ACTIVE
                  </span>
                  <span className="text-[9px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded font-mono">
                    +300 ELO
                  </span>
                </div>
              </div>
              {/* Internal Knight progress level */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>

          {/* Timeline Node 4: Guardian (LOCKED) */}
          <div className="relative opacity-55">
            <span className="absolute -left-[30px] top-2 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-800 border border-zinc-50 dark:border-[#030712]" />
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start bg-zinc-950/20">
              <div>
                <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Guardian</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Target Rating: 1600 - 1899</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-650 bg-zinc-200/50 dark:bg-zinc-900/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                LOCKED
              </span>
            </div>
          </div>

          {/* Timeline Node 5: Crusader (LOCKED) */}
          <div className="relative opacity-55">
            <span className="absolute -left-[30px] top-2 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-800 border border-zinc-50 dark:border-[#030712]" />
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start bg-zinc-950/20">
              <div>
                <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Crusader</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Target Rating: 1900 - 2199</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-650 bg-zinc-200/50 dark:bg-zinc-900/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                LOCKED
              </span>
            </div>
          </div>

          {/* Timeline Node 6: Elite Knight (LOCKED) */}
          <div className="relative opacity-55">
            <span className="absolute -left-[30px] top-2 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-800 border border-zinc-50 dark:border-[#030712]" />
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start bg-zinc-950/20">
              <div>
                <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Elite Knight</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Target Rating: 2200 - 2399</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-650 bg-zinc-200/50 dark:bg-zinc-900/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                LOCKED
              </span>
            </div>
          </div>

          {/* Timeline Node 7: Master Guardian (LOCKED) */}
          <div className="relative opacity-55">
            <span className="absolute -left-[30px] top-2 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-800 border border-zinc-50 dark:border-[#030712]" />
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start bg-zinc-950/20">
              <div>
                <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Master Guardian</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Target Rating: 2400 - 2499</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-650 bg-zinc-200/50 dark:bg-zinc-900/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                LOCKED
              </span>
            </div>
          </div>

          {/* Timeline Node 8: Legendary Grandmaster (LOCKED) */}
          <div className="relative opacity-55">
            <span className="absolute -left-[30px] top-2 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-800 border border-zinc-50 dark:border-[#030712]" />
            <div className="glass-card rounded-2xl p-4 flex justify-between items-start bg-zinc-950/20">
              <div>
                <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Legendary Grandmaster</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Target Rating: 2500+</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-650 bg-zinc-200/50 dark:bg-zinc-900/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                LOCKED
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* MILESTONE BADGES */}
      <section className="space-y-4">
        <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block font-mono">
          MILESTONE BADGES
        </span>

        <div className="grid grid-cols-2 gap-4">
          {/* Badge 1: DP Master */}
          <div className="glass-card rounded-2xl p-5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-3">
              <Boxes className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">DP Master</h4>
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-2 block">
              MASTERED
            </span>
          </div>

          {/* Badge 2: Recursion Wizard */}
          <div className="glass-card rounded-2xl p-5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple mb-3">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">Recursion Wizard</h4>
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-2 block">
              MASTERED
            </span>
          </div>

          {/* Badge 3: DB Architect */}
          <div className="glass-card rounded-2xl p-5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">DB Architect</h4>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1 overflow-hidden mt-3 max-w-[80px]">
              <div className="bg-brand-blue h-1" style={{ width: '40%' }} />
            </div>
            <span className="text-[8px] font-bold text-brand-blue uppercase tracking-widest mt-2 block font-mono">
              40% PROGRESS
            </span>
          </div>

          {/* Badge 4: Zero Day Fixer */}
          <div className="glass-card rounded-2xl p-5 text-center flex flex-col items-center opacity-55">
            <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-650 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-mono">Zero Day Fixer</h4>
            <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-650 uppercase tracking-widest mt-3.5 block font-mono">
              LOCKED
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
