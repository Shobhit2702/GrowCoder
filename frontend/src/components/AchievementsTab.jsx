import { 
  Zap, 
  Gauge, 
  Trophy, 
  Sparkles, 
  Check, 
  Boxes, 
  Database, 
  Shield,
  Lock,
  Globe,
  Code
} from 'lucide-react'

export default function AchievementsTab({ data }) {
  if (!data) return null;

  const metrics = {
    solved: data?.solvedStats?.all || 0,
    easy: data?.solvedStats?.easy || 0,
    medium: data?.solvedStats?.medium || 0,
    hard: data?.solvedStats?.hard || 0,
    rating: data?.contest?.currentRating || 0,
    topPercentage: 100,
    consistency: data?.activity?.totalActiveDays || 0,
    growth: data?.solvedStats?.growth || 0,
    attendedContestsCount: data?.contest?.contestsParticipated || 0
  };

  const aiAnalysis = data?.aiAnalysis || {
    eloProjection: 0
  };

  const getTierInfo = (rating) => {
    if (rating >= 2200) return { name: 'LEGENDARY GRANDMASTER', activeNode: 1, xpTotal: 25000, xpCurrent: 25000 };
    if (rating >= 2000) return { name: 'MASTER GUARDIAN', activeNode: 2, xpTotal: 20000, xpCurrent: 18400 };
    if (rating >= 1800) return { name: 'ELITE KNIGHT', activeNode: 3, xpTotal: 17500, xpCurrent: 15100 };
    if (rating >= 1650) return { name: 'CRUSADER', activeNode: 4, xpTotal: 15000, xpCurrent: 12400 };
    if (rating >= 1500) return { name: 'GUARDIAN', activeNode: 5, xpTotal: 12000, xpCurrent: 9800 };
    if (rating >= 1350) return { name: 'KNIGHT', activeNode: 6, xpTotal: 9000, xpCurrent: 7600 };
    return { name: 'BEGINNER', activeNode: 7, xpTotal: 5000, xpCurrent: rating === 0 ? 0 : 2100 };
  };

  const tier = getTierInfo(metrics.rating);
  const xpPercent = Math.min(100, Math.round((tier.xpCurrent / tier.xpTotal) * 100));

  const nodes = [
    { idx: 1, name: 'Legendary Grandmaster', top: '8%', left: '48%' },
    { idx: 2, name: 'Master Guardian', top: '22%', left: '58%' },
    { idx: 3, name: 'Elite Knight', top: '36%', left: '38%' },
    { idx: 4, name: 'Crusader', top: '50%', left: '50%' },
    { idx: 5, name: 'Guardian', top: '64%', left: '38%' },
    { idx: 6, name: 'Knight', top: '78%', left: '58%' },
    { idx: 7, name: 'Beginner', top: '92%', left: '48%' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. HERO RANK INDICATOR / ASCENT CARD */}
      <section className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-6 relative overflow-hidden shadow-2xl transition-colors">
        
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/80" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/80" />

        <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">
          
          {/* Left: Circular progress ring & Rank text */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Circular progress path */}
              <svg className="w-full h-full transform -rotate-90 absolute">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-zinc-100 dark:stroke-[#121620]"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-[#3b82f6]"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={213}
                  strokeDashoffset={213 - (213 * xpPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <Shield className="w-7 h-7 text-[#3b82f6]" />
            </div>
            <span className="text-[9.5px] font-mono font-bold tracking-widest text-[#3b82f6] mt-2 block uppercase">
              RANK: {tier.name.split(' ')[0]}
            </span>
          </div>

          {/* Center: Progress & Ascent Metrics */}
          <div className="flex-1 space-y-4 text-left w-full">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight uppercase leading-none">
                {tier.name} Ascent
              </h2>
              <div className="flex items-center gap-3 font-mono text-[9.5px] text-zinc-500 dark:text-zinc-400 mt-2 font-bold">
                <span>NEXT_TIER: {tier.xpTotal} XP</span>
                <span className="text-emerald-505 dark:text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                  ELO.PROJECTION: +{aiAnalysis.eloProjection}
                </span>
              </div>
            </div>

            {/* XP progress bar */}
            <div>
              <div className="w-full bg-zinc-100 dark:bg-[#121620] border border-zinc-200 dark:border-zinc-900/60 rounded-full h-3 overflow-hidden">
                <div className="bg-[#3b82f6] h-3 rounded-full transition-all shadow-[0_0_10px_rgba(59,130,246,0.35)]" style={{ width: `${xpPercent}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-[#3b82f6] font-mono font-bold mt-1.5">
                <span className="text-zinc-550">{tier.xpCurrent} XP</span>
                <span>{xpPercent}% COMPLETE</span>
              </div>
            </div>
          </div>

          {/* Right: Large ELO value & Telemetry metrics */}
          <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end gap-6 shrink-0 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-zinc-250 dark:border-zinc-900 pt-4 lg:pt-0 lg:pl-6 text-right">
            <div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 block uppercase mb-1">CURRENT ELO</span>
              <span className="text-3xl font-black text-[#2563eb] dark:text-[#3b82f6] font-mono tracking-tight leading-none block">
                {metrics.rating} <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-0.5">ELO</span>
              </span>
            </div>

            <div className="font-mono text-[9px] space-y-0.5 text-left lg:text-right font-bold">
              <div>SYSTEM.STATUS: <span className="text-emerald-505">ACTIVE</span></div>
              <div>SOLVED_WEIGHT: {metrics.growth}%</div>
              <div className="text-zinc-500 font-medium">STREAK: {metrics.consistency} DAYS</div>
            </div>
          </div>

        </div>

      </section>

      {/* 2. THREE QUICK METRICS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Solutions Card */}
        <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 flex items-center justify-between relative shadow-2xl transition-colors">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

          <div className="text-left font-mono">
            <span className="block text-[8.5px] text-zinc-550 dark:text-zinc-400 font-bold uppercase tracking-wider">Solutions</span>
            <span className="block text-xl font-black text-[#3b82f6] tracking-wide mt-1.5 leading-none">
              {metrics.solved} <span className="text-[10px] font-bold text-zinc-500 uppercase">Solved</span>
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-[#3b82f6]">
            <Code className="w-5 h-5" />
          </div>
        </div>

        {/* Global Standing Card */}
        <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 flex items-center justify-between relative shadow-2xl transition-colors">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

          <div className="text-left font-mono">
            <span className="block text-[8.5px] text-zinc-550 dark:text-zinc-400 font-bold uppercase tracking-wider">Global Standing</span>
            <span className="block text-xl font-black text-emerald-500 tracking-wide mt-1.5 leading-none">
              Top {metrics.topPercentage}% <span className="text-[10px] font-bold text-zinc-500 uppercase font-mono">Global</span>
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        {/* Session Logic Card */}
        <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 flex items-center justify-between relative shadow-2xl transition-colors">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

          <div className="text-left font-mono">
            <span className="block text-[8.5px] text-zinc-550 dark:text-zinc-400 font-bold uppercase tracking-wider">Consistency</span>
            <span className="block text-xl font-black text-purple-600 dark:text-purple-400 tracking-wide mt-1.5 leading-none">
              {metrics.consistency} <span className="text-[10px] font-bold text-zinc-500 uppercase">Streak</span>
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-500">
            <Zap className="w-5 h-5" />
          </div>
        </div>

      </section>

      {/* 3. ASCENT PATH LOGIC (Timeline / SVG Roadmap) */}
      <section className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-6 relative overflow-hidden shadow-2xl transition-colors">
        
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/80" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/80" />

        <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-[#171c26]/60 pb-3 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="text-[#3b82f6]">●</span>
            <span>ASCENT_PATH_LOGIC</span>
          </div>
        </div>

        {metrics.rating === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center font-mono space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-[#121620]/80 border border-zinc-250 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500 text-2xl font-black">
              🔒
            </div>
            <p className="text-zinc-650 dark:text-zinc-400 text-xs max-w-md leading-relaxed">
              You haven't participated in a contest yet. Participate in your first contest to begin your rating journey.
            </p>
          </div>
        ) : (
          <div className="relative w-full max-w-[600px] h-[650px] mx-auto select-none overflow-hidden">
            
            {/* SVG Connector Trail Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 650" fill="none">
              {/* 1. Base Trail Path (Gray Connection for locked sections) */}
              <path 
                d="M 288 598 C 340 560, 360 540, 348 507 C 330 460, 240 450, 228 416 C 210 370, 290 350, 300 325 C 310 290, 240 270, 228 234 C 210 190, 330 170, 348 143 C 360 110, 310 90, 288 52"
                className="stroke-zinc-300 dark:stroke-zinc-800"
                strokeWidth="3.5"
                strokeDasharray="6,6"
              />
            </svg>

            {/* Absolute HTML nodes along the paths */}
            {nodes.map((node) => {
              const isActive = node.idx === tier.activeNode;
              const isCompleted = node.idx > tier.activeNode;
              const isLocked = node.idx < tier.activeNode;

              return (
                <div 
                  key={node.idx}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
                  style={{ top: node.top, left: node.left }}
                >
                  {isActive && (
                    <>
                      <div className="w-12 h-12 rounded bg-blue-600 dark:bg-[#2563eb] border-2 border-blue-400/80 flex items-center justify-center text-white shadow-[0_0_18px_rgba(37,99,235,0.45)] select-none">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9.5px] font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider text-center whitespace-nowrap">
                        [ {node.name} ]
                      </span>
                    </>
                  )}

                  {isCompleted && (
                    <>
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/75 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <span className="font-mono text-[8.5px] font-bold text-emerald-650 dark:text-emerald-400 uppercase tracking-widest text-center whitespace-nowrap">
                        {node.name}
                      </span>
                    </>
                  )}

                  {isLocked && (
                    <>
                      <div className="w-9 h-9 rounded border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/80 flex items-center justify-center text-zinc-400 dark:text-zinc-655">
                        <Lock className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[8px] font-bold text-zinc-400 dark:text-zinc-655 uppercase tracking-widest text-center whitespace-nowrap">
                        {node.name}
                      </span>
                    </>
                  )}
                </div>
              );
            })}

          </div>
        )}

      </section>

      {/* 4. RECENT WINS & DETAILED win cards */}
      <section className="space-y-4 text-left">
        
        {/* Header Title */}
        <div className="font-mono text-[10px] text-zinc-550 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-[#171c26]/60 pb-2">
          RECENT WINS / TACTICAL EXTRACTION
        </div>

        {/* Slider Circular time badges */}
        <div className="flex gap-5 overflow-x-auto pb-3 pr-1 scrollbar-thin scroll-smooth select-none">
          
          {/* Badge 1: T-Minus 2h */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-dashed border-[#3b82f6]/40 bg-zinc-50 dark:bg-[#0f1422]/60 hover:border-[#3b82f6] transition-colors relative cursor-pointer group">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-blue-400/10" />
              <Zap className="w-5 h-5 text-[#3b82f6] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-zinc-400 dark:text-zinc-500 mt-2 block">T-MINUS 2H</span>
          </div>

          {/* Badge 2: T-Minus 8h */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-dashed border-[#3b82f6]/30 bg-zinc-50 dark:bg-[#0f1422]/60 hover:border-[#3b82f6] transition-colors relative cursor-pointer group">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-blue-400/10" />
              <Gauge className="w-5 h-5 text-[#3b82f6] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-zinc-400 dark:text-zinc-500 mt-2 block">T-MINUS 8H</span>
          </div>

          {/* Badge 3: Yesterday */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-dashed border-emerald-500/30 bg-zinc-50 dark:bg-emerald-950/10 hover:border-emerald-500 transition-colors relative cursor-pointer group">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-emerald-400/10" />
              <Trophy className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-zinc-400 dark:text-zinc-500 mt-2 block">YESTERDAY</span>
          </div>

          {/* Badge 4: Date A */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-dashed border-purple-500/30 bg-zinc-50 dark:bg-purple-950/10 hover:border-purple-550 transition-colors relative cursor-pointer group">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-purple-400/10" />
              <Sparkles className="w-5 h-5 text-[#8b5cf6] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-zinc-400 dark:text-zinc-500 mt-2 block">RECENT</span>
          </div>

        </div>

        {/* Detailed win cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: DP Master */}
          <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-zinc-900 rounded-lg p-5 flex flex-col justify-between transition-colors min-h-[145px] hover:border-emerald-500 relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-500" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white font-mono leading-none">Code Master</h4>
                <span className="text-[8.5px] text-zinc-500 font-mono tracking-wider uppercase mt-1 block">General Algorithmic Logic</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="w-full bg-zinc-100 dark:bg-[#121620] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
              <span className="text-[8.5px] font-bold text-emerald-500 uppercase tracking-widest block font-mono">
                COMPLETE 100%
              </span>
            </div>
          </div>

          {/* Card 2: Recursion Wizard */}
          <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-zinc-900 rounded-lg p-5 flex flex-col justify-between transition-colors min-h-[145px] hover:border-[#3b82f6] relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#3b82f6]" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white font-mono leading-none">Recursion Wizard</h4>
                <span className="text-[8.5px] text-zinc-500 font-mono tracking-wider uppercase mt-1 block">Recursive Logic Engine</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="w-full bg-zinc-100 dark:bg-[#121620] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#3b82f6] h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
              <span className="text-[8.5px] font-bold text-[#3b82f6] uppercase tracking-widest block font-mono">
                COMPLETE 100%
              </span>
            </div>
          </div>

          {/* Card 3: DB Architect */}
          <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-zinc-900 rounded-lg p-5 flex flex-col justify-between transition-colors min-h-[145px] hover:border-purple-555 relative group shadow-2xl">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-500" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white font-mono leading-none">DB Architect</h4>
                <span className="text-[8.5px] text-zinc-500 font-mono tracking-wider uppercase mt-1 block">Schema & Index Scaling</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="w-full bg-zinc-100 dark:bg-[#121620] rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '40%' }} />
              </div>
              <span className="text-[8.5px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest block font-mono">
                40% PROGRESS / 4/10
              </span>
            </div>
          </div>

          {/* Card 4: Zero Day Fixer */}
          <div className="bg-[#fcfcfc] dark:bg-[#080b11]/25 border border-zinc-200 dark:border-zinc-900/60 rounded-lg p-5 flex flex-col justify-between transition-colors min-h-[145px] relative opacity-55 shadow-2xl">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-650">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-450 dark:text-zinc-550 font-mono leading-none">Zero Day Fixer</h4>
                <span className="text-[8.5px] text-zinc-550 font-mono tracking-wider uppercase mt-1 block">Security Infrastructure</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="w-full bg-zinc-100 dark:bg-[#121620]/40 rounded-full h-1.5 overflow-hidden">
                <div className="bg-zinc-350 dark:bg-zinc-850 h-1.5 rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="text-[8.5px] font-bold text-zinc-450 dark:text-zinc-600 uppercase tracking-widest block font-mono">
                🔒 LOCKED TIER
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* 5. MONOSPACE DIAGNOSTIC FOOTER */}
      <footer className="pt-6 border-t border-zinc-200 dark:border-[#171c26]/60 flex flex-wrap justify-between items-center gap-4 font-mono text-[9px] text-zinc-500 dark:text-zinc-555 leading-relaxed font-bold">
        <div className="flex gap-4">
          <a href="#docs" className="hover:text-zinc-850 dark:hover:text-zinc-400 transition-colors uppercase">Documentation</a>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <a href="#security" className="hover:text-zinc-850 dark:hover:text-zinc-400 transition-colors uppercase">Security Protocol</a>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span className="text-zinc-450 dark:text-zinc-500 uppercase">V2.5.0-STABLE</span>
        </div>
        <div className="text-right space-y-0.5">
          <div>GROWCODE_OS // DISTRIBUTED_MEDAL_V03</div>
          <div className="text-[8.5px] text-zinc-550 dark:text-zinc-600">LATENCY: 12MS // ENCRYPTION: AES-256</div>
        </div>
      </footer>

    </div>
  )
}
