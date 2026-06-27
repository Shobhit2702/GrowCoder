import { useRef } from 'react'
import { 
  CheckCircle2, 
  Cpu, 
  AlertTriangle, 
  Info, 
  Lightbulb, 
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AnalysisTab({ setActiveTab, data, onStartDrill }) {
  const masteryContainerRef = useRef(null)
  const bottlenecksContainerRef = useRef(null)

  // Extract AI analysis, fallback to default mock structure if missing
  const aiAnalysis = data?.aiAnalysis || {
    eloProjection: 142,
    strengths: [
      { topic: 'Arrays', mastery: 94 },
      { topic: 'Trees', mastery: 92 },
      { topic: 'Linked Lists', mastery: 88 },
      { topic: 'Hashing', mastery: 85 },
      { topic: 'Strings', mastery: 82 }
    ],
    bottlenecks: [
      { topic: 'Dynamic Programming', priority: 1, severity: 9.2, ratingPotential: 85 },
      { topic: 'Backtracking', priority: 2, severity: 6.5, ratingPotential: 48 },
      { topic: 'Graphs (DFS/BFS)', priority: 3, severity: 5.4, ratingPotential: 32 }
    ],
    anomalies: [
      {
        id: 'ANOMALY 01',
        title: 'STATE DEFINITION GAP',
        description: 'Recurrent failure to identify minimal sufficient parameters for state memoization, leading to redundant calculations in 42% of test cases.',
        impact: 'HIGH LATENCY IMPACT',
        impactLevel: 'high'
      },
      {
        id: 'ANOMALY 02',
        title: 'PRUNING INEFFICIENCY',
        description: 'Inefficient bounding functions in optimization problems resulting in excessive branch exploration during depth-first traversals.',
        impact: 'MODERATE COMPLEXITY',
        impactLevel: 'moderate'
      },
      {
        id: 'ANOMALY 03',
        title: 'SUBPROBLEM OVERLAP',
        description: 'Misidentification of optimal substructure properties in non-linear sequence problems. Tendency to over-complicate recurrence relations.',
        impact: 'KNOWLEDGE GAP DETECTED',
        impactLevel: 'low'
      }
    ],
    nextAction: {
      topic: 'DP Optimization',
      eloGain: 85,
      drillTitle: 'Dynamic Programming'
    },
    dailyPlan: {
      topic: 'Dynamic Programming',
      description: 'Practice translating recursive top-down equations to bottom-up tabular DP.'
    }
  };

  const handleScrollMastery = () => {
    if (masteryContainerRef.current) {
      const container = masteryContainerRef.current
      const isAtBottom = Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 2
      if (isAtBottom) {
        container.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ top: 70, behavior: 'smooth' })
      }
    }
  }

  const handleScrollBottlenecks = (direction) => {
    if (bottlenecksContainerRef.current) {
      const container = bottlenecksContainerRef.current
      const scrollAmount = direction === 'left' ? -220 : 220
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 dark:border-[#171c26]/60 pb-5 mb-2 shrink-0">
        <div>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono font-bold">NEURAL ANALYSIS PHASE 05</span>
          <h1 className="font-display font-black text-4xl text-zinc-900 dark:text-white mt-1.5 uppercase leading-none">
            WEAKNESS ANALYSIS
          </h1>
        </div>
        <div className="mt-3.5 sm:mt-0 flex items-center bg-[#2563eb]/10 border border-[#2563eb]/45 px-4 py-2 rounded text-[10px] font-mono text-[#2563eb] dark:text-zinc-200 gap-2.5 shadow-md">
          <span className="text-[#3b82f6] font-bold">ELO PROJECTION:</span>
          <span className="font-black text-zinc-900 dark:text-white">+{aiAnalysis.eloProjection}</span>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Strengths & Topic Mastery (Col-span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Strengths Card */}
          <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5 border-b border-zinc-200 dark:border-[#171c26]/60 pb-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-400">STRENGTHS / TOPIC MASTERY</span>
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
            </div>

            {/* Mastery progress rows with vertical scroll wrapper */}
            <div 
              ref={masteryContainerRef}
              className="space-y-4 max-h-[300px] overflow-y-auto pr-1.5 scroll-smooth"
            >
              {aiAnalysis.strengths.map((str, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                    <span className="text-zinc-800 dark:text-white uppercase">{str.topic}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{str.mastery}% MASTERED</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: `${str.mastery}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll down indicator chevron */}
            <div className="flex justify-center pt-3 pb-1">
              <button 
                onClick={handleScrollMastery}
                className="text-zinc-500 dark:text-zinc-555 hover:text-zinc-800 dark:hover:text-zinc-350 cursor-pointer font-bold select-none animate-bounce focus:outline-none bg-zinc-100 dark:bg-zinc-900/30 w-7 h-7 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800/40"
                title="Scroll Topics"
              >
                v
              </button>
            </div>

            {/* Dash border info card */}
            <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-3.5 text-[9.5px] font-mono text-zinc-550 leading-relaxed text-left">
              <span className="text-blue-500 font-bold">INFO:</span> NO DEGRADATION DETECTED IN CORE STRUCTURES. MASTERY REMAINS WITHIN THE TOP OF ENGINEERING COHORTS.
            </div>

          </div>

          {/* AI-Optimized Strategy card below Strengths */}
          <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden flex items-start gap-4 shadow-2xl transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6] shrink-0 mt-0.5">
              <Lightbulb className="w-4.5 h-4.5" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] font-bold text-[#3b82f6] dark:text-blue-400 tracking-wider">AI-OPTIMIZED STRATEGY</div>
              <p className="text-[11px] text-zinc-655 dark:text-zinc-400 mt-2 leading-relaxed">
                {aiAnalysis.dailyPlan?.description || 'Practice and optimize solutions for weak topics.'}
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Bottlenecks & Anomaly root cause analyzer (Col-span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CRITICAL BOTTLENECKS SECTION */}
          <div className="space-y-3.5">
            <div className="text-left">
              <span className="text-[10px] tracking-widest text-zinc-555 dark:text-zinc-400 uppercase font-mono font-bold">CRITICAL BOTTLENECKS</span>
            </div>

            {/* Row of panels - Overlaid with horizontal scroll buttons */}
            <div className="relative">
              
              {/* Scroll Left Button */}
              <button 
                onClick={() => handleScrollBottlenecks('left')}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#131622]/95 border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500 flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-xl"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 text-[#2563eb]" />
              </button>

              {/* Scroll Right Button */}
              <button 
                onClick={() => handleScrollBottlenecks('right')}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#131622]/95 border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500 flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-xl"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 text-[#2563eb]" />
              </button>

              {/* Scroll Container */}
              <div 
                ref={bottlenecksContainerRef}
                className="flex gap-4 overflow-x-auto pb-3 scrollbar-none scroll-smooth select-none"
              >
                {aiAnalysis.bottlenecks.map((bot, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors"
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                    <div className="flex justify-between items-center mb-2">
                      <span className={`border font-mono font-bold text-[9px] px-2 py-0.5 rounded ${
                        bot.priority === 1
                          ? 'bg-red-500/10 border-red-500/20 text-red-555 dark:text-red-400'
                          : 'bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/40 text-zinc-650 dark:text-zinc-400'
                      }`}>
                        PRIORITY 0{bot.priority}
                      </span>
                      {bot.priority === 1 && <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 animate-pulse" />}
                    </div>

                    <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                      {bot.topic}
                    </h3>

                    <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                      <div>
                        <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                        <span className={`font-black ${bot.priority === 1 ? 'text-red-505 dark:text-red-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                          {bot.severity.toFixed(1)} / 10
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{bot.ratingPotential} ELO</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROOT CAUSE ANALYSIS GLASSMORPHIC CARD */}
          <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl space-y-4 transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

            {/* Header */}
            <div className="flex items-center gap-2.5 font-mono border-b border-zinc-200 dark:border-[#171c26]/60 pb-3">
              <Cpu className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-300 uppercase leading-none mt-0.5">
                ROOT CAUSE ANALYSIS // {aiAnalysis.nextAction.topic.toUpperCase()}
              </span>
            </div>

            {/* Grid layout containing 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-left">
              {aiAnalysis.anomalies.map((anom, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col justify-between space-y-3 ${
                    idx > 0 
                      ? 'border-t md:border-t-0 md:border-l border-zinc-200 dark:border-[#171c26]/80 pt-4 md:pt-0 md:pl-4' 
                      : ''
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="block text-[8.5px] font-bold text-[#3b82f6] tracking-wider">{anom.id}</span>
                    <h4 className="text-[11.5px] font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">{anom.title}</h4>
                    <p className="text-[10px] text-zinc-650 dark:text-zinc-455 leading-relaxed font-sans mt-2">
                      {anom.description}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-[8.5px] px-2 py-1 rounded w-fit font-bold ${
                    anom.impactLevel === 'high'
                      ? 'text-red-500 dark:text-red-400 bg-red-500/5 border border-red-500/10'
                      : 'text-[#3b82f6] bg-blue-500/5 border border-blue-500/10'
                  }`}>
                    {anom.impactLevel === 'high' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 dark:text-red-400 shrink-0" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                    )}
                    <span>{anom.impact.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* NEXT PRIORITY ACTION container */}
            <div className="bg-zinc-50 dark:bg-[#0c1018] border border-zinc-200 dark:border-[#171c26] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center text-[#3b82f6] shrink-0">
                  <Target className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left font-mono">
                  <span className="block text-[10px] font-bold text-zinc-900 dark:text-white leading-none">NEXT PRIORITY ACTION</span>
                  <p className="text-[10.5px] text-zinc-600 dark:text-zinc-455 mt-1.5 leading-normal">
                    Focus on <strong className="text-blue-600 dark:text-blue-450 font-bold">{aiAnalysis.nextAction.topic}</strong> to gain approx. +{aiAnalysis.nextAction.eloGain} ELO points.
                  </p>
                </div>
              </div>
              <button 
                className="bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[10.5px] px-5 py-2.5 rounded transition-all active:scale-95 cursor-pointer shrink-0 uppercase tracking-wider shadow-md shadow-blue-600/15"
                onClick={() => onStartDrill(aiAnalysis.nextAction.topic)}
              >
                Start Drill
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Code Status Footer Console */}
      <div className="pt-4 border-t border-zinc-200 dark:border-[#171c26]/60 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 font-mono text-[9px] text-zinc-500 dark:text-zinc-555 leading-relaxed pt-3">
        <div className="text-left text-[#3b82f6] dark:text-[#3b82f6]/70">
          PATH: /USER/ANALYSIS/{aiAnalysis.nextAction.drillTitle.toUpperCase().replace(/\s+/g, '_')} <span className="text-zinc-300 dark:text-zinc-700 ml-1 mr-1">|</span> UTF-8
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">CONNECTED</span>
          <span className="text-zinc-300 dark:text-zinc-700 font-normal">|</span>
          <span>V2.5.0-STABLE</span>
        </div>
      </div>

    </div>
  )
}
