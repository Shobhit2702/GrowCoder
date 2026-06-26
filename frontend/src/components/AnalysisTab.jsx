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

export default function AnalysisTab({ setActiveTab }) {
  const masteryContainerRef = useRef(null)
  const bottlenecksContainerRef = useRef(null)

  const handleScrollMastery = () => {
    if (masteryContainerRef.current) {
      const container = masteryContainerRef.current
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
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
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono font-bold">NEURAL ANALYSIS PHASE 04</span>
          <h1 className="font-display font-black text-4xl text-zinc-900 dark:text-white mt-1.5 uppercase leading-none">
            WEAKNESS ANALYSIS
          </h1>
        </div>
        <div className="mt-3.5 sm:mt-0 flex items-center bg-[#2563eb]/10 border border-[#2563eb]/45 px-4 py-2 rounded text-[10px] font-mono text-[#2563eb] dark:text-zinc-200 gap-2.5 shadow-md">
          <span className="text-[#3b82f6] font-bold">ELO PROJECTION:</span>
          <span className="font-black text-zinc-900 dark:text-white">+142</span>
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
              className="space-y-4 max-h-[220px] overflow-y-auto pr-1.5 scrollbar-thin scroll-smooth"
            >
              {/* Item 1 */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">ARRAYS</span>
                  <span className="text-emerald-600 dark:text-emerald-400">94% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              {/* Item 2 */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">TREES</span>
                  <span className="text-emerald-600 dark:text-emerald-400">92% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Item 3 */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">LINKED LISTS</span>
                  <span className="text-emerald-600 dark:text-emerald-400">88% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Item 4 */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">HASHING</span>
                  <span className="text-emerald-600 dark:text-emerald-400">85% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Item 5 */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">STRINGS</span>
                  <span className="text-emerald-600 dark:text-emerald-400">82% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              {/* Extra Items */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">HEAPS & PRIORITY QUEUES</span>
                  <span className="text-emerald-600 dark:text-emerald-400">80% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">STACKS & QUEUES</span>
                  <span className="text-emerald-600 dark:text-emerald-400">78% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10.5px] font-mono font-bold mb-1">
                  <span className="text-zinc-800 dark:text-white">BIN SEARCH</span>
                  <span className="text-emerald-600 dark:text-emerald-400">76% MASTERED</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-[#07080d] border border-zinc-200 dark:border-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#10b981] h-1.5 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

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
              <span className="text-blue-500 font-bold">INFO:</span> NO DEGRADATION DETECTED IN CORE STRUCTURES. MASTERY REMAINS WITHIN THE TOP 2% OF ENGINEERING COHORTS.
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
                Practice translating recursive top-down equations to bottom-up tabular DP.
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
                {/* Bottleneck 1: Dynamic Programming */}
                <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-red-500/10 border border-red-500/20 text-red-505 dark:text-red-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                      PRIORITY 01
                    </span>
                    <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 animate-pulse" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                    DYNAMIC PROGRAMMING
                  </h3>

                  <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                      <span className="text-red-505 dark:text-red-400 font-black">9.2 / 10</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+85 ELO</span>
                    </div>
                  </div>
                </div>

                {/* Bottleneck 2: Backtracking */}
                <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40 text-zinc-650 dark:text-zinc-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                      PRIORITY 02
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                    BACKTRACKING
                  </h3>

                  <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-black">6.5 / 10</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+48 ELO</span>
                    </div>
                  </div>
                </div>

                {/* Bottleneck 3: Graphs (DFS/BFS) */}
                <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40 text-zinc-650 dark:text-zinc-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                      PRIORITY 03
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                    GRAPHS (DFS/BFS)
                  </h3>

                  <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-black">5.4 / 10</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+32 ELO</span>
                    </div>
                  </div>
                </div>

                {/* Bottleneck 4: Greedy Algorithms */}
                <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40 text-zinc-650 dark:text-zinc-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                      PRIORITY 04
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                    GREEDY ALGORITHMS
                  </h3>

                  <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-black">4.8 / 10</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+20 ELO</span>
                    </div>
                  </div>
                </div>

                {/* Bottleneck 5: Heap & Sorting */}
                <div className="bg-white dark:bg-[#0b0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-xl p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[155px] min-w-[280px] shrink-0 md:shrink md:flex-1 transition-colors">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/50" />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40 text-zinc-650 dark:text-zinc-400 font-mono font-bold text-[9px] px-2 py-0.5 rounded">
                      PRIORITY 05
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white tracking-tight uppercase text-left leading-tight">
                    HEAP & SORTING
                  </h3>

                  <div className="border-t border-zinc-200 dark:border-[#171c26] pt-2 mt-2 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">SEVERITY</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-black">4.2 / 10</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-wider">RATING POTENTIAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+15 ELO</span>
                    </div>
                  </div>
                </div>

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
              <span className="text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-300 uppercase leading-none mt-0.5">ROOT CAUSE ANALYSIS // DYNAMIC PROGRAMMING</span>
            </div>

            {/* Grid layout containing 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-left">
              
              {/* Anomaly 1 */}
              <div className="flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="block text-[8.5px] font-bold text-[#3b82f6] tracking-wider">ANOMALY 01</span>
                  <h4 className="text-[11.5px] font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">STATE DEFINITION GAP</h4>
                  <p className="text-[10px] text-zinc-650 dark:text-zinc-455 leading-relaxed font-sans mt-2">
                    Recurrent failure to identify minimal sufficient parameters for state memoization, leading to redundant calculations in 42% of test cases.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[8.5px] text-red-500 dark:text-red-400 bg-red-500/5 border border-red-500/10 px-2 py-1 rounded w-fit font-bold">
                  <AlertTriangle className="w-3 h-3 text-red-500 dark:text-red-400 shrink-0" />
                  <span>HIGH LATENCY IMPACT</span>
                </div>
              </div>

              {/* Anomaly 2 */}
              <div className="flex flex-col justify-between space-y-3 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-[#171c26]/80 pt-4 md:pt-0 md:pl-4">
                <div className="space-y-1.5">
                  <span className="block text-[8.5px] font-bold text-[#3b82f6] tracking-wider">ANOMALY 02</span>
                  <h4 className="text-[11.5px] font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">PRUNING INEFFICIENCY</h4>
                  <p className="text-[10px] text-zinc-655 dark:text-zinc-455 leading-relaxed font-sans mt-2">
                    Inefficient bounding functions in optimization problems resulting in excessive branch exploration during depth-first traversals.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[8.5px] text-[#3b82f6] bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded w-fit font-bold">
                  <Info className="w-3 h-3 text-[#3b82f6] shrink-0" />
                  <span>MODERATE COMPLEXITY</span>
                </div>
              </div>

              {/* Anomaly 3 */}
              <div className="flex flex-col justify-between space-y-3 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-[#171c26]/80 pt-4 md:pt-0 md:pl-4">
                <div className="space-y-1.5">
                  <span className="block text-[8.5px] font-bold text-[#3b82f6] tracking-wider">ANOMALY 03</span>
                  <h4 className="text-[11.5px] font-bold text-zinc-900 dark:text-white tracking-wide leading-tight">SUBPROBLEM OVERLAP</h4>
                  <p className="text-[10px] text-zinc-655 dark:text-zinc-455 leading-relaxed font-sans mt-2">
                    Misidentification of optimal substructure properties in non-linear sequence problems. Tendency to over-complicate recurrence relations.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[8.5px] text-[#3b82f6] bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded w-fit font-bold">
                  <Info className="w-3 h-3 text-[#3b82f6] shrink-0" />
                  <span>KNOWLEDGE GAP DETECTED</span>
                </div>
              </div>

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
                    Focus on <strong className="text-blue-600 dark:text-blue-450 font-bold">DP Optimization</strong> to gain approx. +85 ELO points.
                  </p>
                </div>
              </div>
              <button 
                className="bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[10.5px] px-5 py-2.5 rounded transition-all active:scale-95 cursor-pointer shrink-0 uppercase tracking-wider shadow-md shadow-blue-600/15"
                onClick={() => alert('Starting drill sequence for Dynamic Programming...')}
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
          PATH: /USER/ANALYSIS/DP_CRITICAL <span className="text-zinc-300 dark:text-zinc-700 ml-1 mr-1">|</span> LN 256, COL 12 <span className="text-zinc-300 dark:text-zinc-700 ml-1 mr-1">|</span> UTF-8
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">CONNECTED</span>
          <span className="text-zinc-300 dark:text-zinc-700 font-normal">|</span>
          <span>V2.4.0-STABLE</span>
        </div>
      </div>

    </div>
  )
}
