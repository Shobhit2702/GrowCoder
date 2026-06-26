import { useState } from 'react'
import { 
  ChevronRight, 
  Check, 
  Bookmark, 
  Sparkles, 
  User, 
  Send, 
  Play, 
  Zap, 
  Cpu, 
  Code,
  GitFork
} from 'lucide-react'

export default function CoachTab() {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Welcome to today's Dynamic Programming session! Let's address your state definition bottleneck. We will drill 'Word Break II'. Ready to review the recursive formula?" }
  ])
  const [input, setInput] = useState('')
  
  // Interactive checklist states matching Operator style
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'SYSTEM DESIGN: BLOOM FILTERS', checked: true },
    { id: 2, text: 'REVIEW SPACED REPETITION CARDS', checked: true },
    { id: 3, text: 'SOLVE 2 DP HARD PROBLEMS', checked: false },
    { id: 4, text: 'MOCK INTERVIEW: AMAZON V2', checked: false }
  ])

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInput('')

    // Simulate AI feedback
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `Affirmative. To resolve state definition for 'Word Break II', we can write dynamic programming transition: let dp[i] represent the list of valid sentences formed from prefix s[0...i]. Let's verify overlapping substructures step-by-step.` 
      }])
    }, 1000)
  }

  const completedCount = checklist.filter(item => item.checked).length

  // STATE A: Main AI Coach Dashboard
  if (!isSessionActive) {
    return (
      <div className="space-y-6">
        
        {/* TODAY'S FOCUS: DAILY MISSION LOG CARD */}
        <section className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl transition-colors">
          
          {/* Neon Corner Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/80" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/80" />

          {/* Left Column contents */}
          <div className="space-y-4 text-left max-w-2xl flex-1">
            <div className="flex items-center gap-2.5 font-mono">
              <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6]">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#3b82f6] uppercase">DAILY_MISSION_LOG</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight uppercase leading-none mt-2">
              Dynamic Programming
            </h2>

            <p className="text-zinc-650 dark:text-zinc-400 text-sm sm:text-[14.5px] leading-relaxed font-sans font-medium">
              Master the art of recursive optimization. Focus today on overlapping subproblems and optimal substructure identification in complex string manipulations.
            </p>

            {/* Target & Est Metrics block */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-900 pt-5 font-mono max-w-sm">
              <div>
                <span className="block text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Target Questions</span>
                <span className="text-2xl font-black text-[#2563eb] dark:text-[#3b82f6] mt-1 block">
                  5 Total
                </span>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Est. Time</span>
                <span className="text-2xl font-black text-zinc-800 dark:text-white mt-1 block">
                  90 min
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Initiate trigger button */}
          <div className="shrink-0 w-full md:w-auto">
            <button 
              onClick={() => setIsSessionActive(true)}
              className="w-full md:w-auto bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[11px] tracking-wider py-4 px-8 rounded transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 cursor-pointer uppercase"
            >
              <Play className="w-4 h-4 fill-current" />
              Initiate Session
            </button>
          </div>

        </section>

        {/* BOTTOM SECTION: CHECKLIST & SMART PATH ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bottom Left: Progress Checklist (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between flex-1 min-h-[380px] transition-colors">
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-500/60" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-500/60" />

              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-[#171c26] pb-3">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[#3b82f6] text-xs">📋</span>
                    <span className="text-[10px] font-bold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">PROGRESS_CHECKLIST</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-250 dark:border-emerald-500/15 px-2 py-0.5 rounded font-bold">
                    {completedCount}/4 COMPLETE
                  </span>
                </div>

                {/* Checklist list */}
                <div className="space-y-3">
                  {checklist.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`flex items-center justify-between border rounded p-3.5 cursor-pointer transition-all select-none ${
                        item.checked 
                          ? 'bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10' 
                          : 'bg-zinc-500/5 border-zinc-200 dark:border-[#171c26] hover:bg-zinc-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                          item.checked 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-zinc-400 dark:border-zinc-700 bg-transparent'
                        }`}>
                          {item.checked && <Check className="w-3.5 h-3.5 stroke-[3.5px]" />}
                        </div>
                        <span className={`text-[11.5px] font-mono font-bold leading-tight transition-colors ${
                          item.checked 
                            ? 'text-zinc-450 dark:text-zinc-550 line-through' 
                            : 'text-zinc-800 dark:text-zinc-200'
                        }`}>
                          {item.text}
                        </span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold transition-colors ${
                        item.checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-500'
                      }`}>
                        {item.checked ? 'STATUS: VERIFIED' : 'STATUS: PENDING_EXECUTION'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Right: Smart Path Analysis Recommendations (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5 text-left justify-between">
            <div className="flex items-center gap-2 font-mono pl-1">
              <GitFork className="w-4.5 h-4.5 text-[#3b82f6] -rotate-90" />
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">SMART_PATH_ANALYSIS</span>
            </div>

            {/* Row of 2 panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              
              {/* Problem 1: Word Break II */}
              <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between transition-colors h-full min-h-[280px]">
                
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />

                {/* Scrollable Container */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scroll-smooth text-left space-y-3 mb-2 max-h-[175px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9.5px] text-orange-600 dark:text-orange-500 font-mono font-bold uppercase">DIFFICULTY: HARD</span>
                    <Bookmark className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-350 cursor-pointer transition-colors" />
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight uppercase leading-tight">
                    Word Break II
                  </h3>

                  {/* AI Reason box */}
                  <div className="bg-[#0f1422]/65 border-l-2 border-blue-500 p-3 rounded-r text-[10.5px] font-mono leading-relaxed text-zinc-650 dark:text-zinc-400">
                    <span className="text-blue-500 font-bold block mb-0.5">AI REASON:</span>
                    "You previously struggled with String-to-List mapping logic. This problem specifically targets your memoization gap in non-linear backtracking."
                  </div>

                  {/* Extra Technical Details to make it scrollable */}
                  <div className="bg-zinc-500/5 dark:bg-[#121824]/20 border border-zinc-200 dark:border-[#171c26] p-2.5 rounded font-mono text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal space-y-1">
                    <div><span className="font-bold text-[#3b82f6]">COMPLEXITY:</span> O(2^N) backtracking optimized to O(N^2) via memoization.</div>
                    <div><span className="font-bold text-[#3b82f6]">SUBPROBLEMS:</span> Overlapping prefixes s[0...i].</div>
                    <div><span className="font-bold text-[#3b82f6]">PREREQ:</span> Recursion, Memoization, DFS, Trie.</div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSessionActive(true)}
                  className="w-full bg-transparent hover:bg-purple-500/5 border border-purple-500/30 hover:border-purple-555 text-purple-600 dark:text-purple-400 hover:text-purple-300 font-mono font-bold text-[10px] tracking-wider py-2.5 rounded transition-all cursor-pointer text-center uppercase mt-3 shadow-[0_0_10px_rgba(139,92,246,0.05)] shrink-0"
                >
                  Solve_Now
                </button>
              </div>

              {/* Problem 2: Edit Distance */}
              <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between transition-colors h-full min-h-[280px]">
                
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />

                {/* Scrollable Container */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scroll-smooth text-left space-y-3 mb-2 max-h-[175px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9.5px] text-blue-600 dark:text-blue-450 font-mono font-bold uppercase">DIFFICULTY: MEDIUM</span>
                    <Bookmark className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-350 cursor-pointer transition-colors" />
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight uppercase leading-tight">
                    Edit Distance
                  </h3>

                  {/* AI Reason box */}
                  <div className="bg-[#0f1422]/65 border-l-2 border-purple-500 p-3 rounded-r text-[10.5px] font-mono leading-relaxed text-zinc-650 dark:text-zinc-400">
                    <span className="text-[#8b5cf6] font-bold block mb-0.5">AI REASON:</span>
                    "Mastering this establishes the foundation for DNA sequencing and fuzzy search algorithms—key patterns for upcoming FAANG assessments."
                  </div>

                  {/* Extra Technical Details to make it scrollable */}
                  <div className="bg-zinc-500/5 dark:bg-[#121824]/20 border border-zinc-200 dark:border-[#171c26] p-2.5 rounded font-mono text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal space-y-1">
                    <div><span className="font-bold text-[#8b5cf6]">COMPLEXITY:</span> O(M * N) space and time complexity.</div>
                    <div><span className="font-bold text-[#8b5cf6]">SUBPROBLEMS:</span> Alignments s1[0...i] vs s2[0...j].</div>
                    <div><span className="font-bold text-[#8b5cf6]">PREREQ:</span> Dynamic Programming table matching.</div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSessionActive(true)}
                  className="w-full bg-transparent hover:bg-purple-500/5 border border-purple-500/30 hover:border-purple-555 text-purple-600 dark:text-purple-400 hover:text-purple-300 font-mono font-bold text-[10px] tracking-wider py-2.5 rounded transition-all cursor-pointer text-center uppercase mt-3 shadow-[0_0_10px_rgba(139,92,246,0.05)] shrink-0"
                >
                  Solve_Now
                </button>
              </div>

            </div>

            {/* Smart Path Telemetry console footer */}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-[#171c26] flex flex-wrap justify-between items-center gap-4 font-mono text-[9.5px] text-zinc-500 dark:text-zinc-400 leading-none">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-bold">
                <div>SUCCESS RATE / <span className="text-emerald-500">78.4%</span></div>
                <div>GLOBAL RANK / <span className="text-zinc-900 dark:text-zinc-200">Top 3.2%</span></div>
                <div>WEEKLY GAIN / <span className="text-emerald-500">+14.1%</span></div>
              </div>
              <div className="text-zinc-500 text-right font-medium">
                LAST_UPDATE: T-94:22:15_MS
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }

  // STATE B: Active AI Chat Coach Session
  return (
    <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-6 h-[550px] flex flex-col justify-between relative overflow-hidden transition-colors shadow-2xl">
      
      {/* Neon Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/80" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/80" />

      {/* Chat Session Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#171c26] pb-4 mb-2">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsSessionActive(false)}
            className="text-xs font-bold text-[#2563eb] dark:text-[#3b82f6] hover:underline cursor-pointer"
          >
            ← End Session
          </button>
          <span className="text-zinc-350 dark:text-zinc-650">|</span>
          <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">DP Optimization Session</span>
        </div>
        
        {/* LIVE FEED status pill */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500 dark:text-zinc-400 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span>LIVE_FEED</span>
        </div>
      </div>

      {/* Messaging Box */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2 scrollbar-thin scroll-smooth">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user'
          return (
            <div 
              key={idx} 
              className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white ${isUser ? 'bg-purple-600' : 'bg-[#2563eb]'}`}>
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div className={`rounded-lg p-3.5 text-xs leading-relaxed border transition-colors ${
                isUser 
                  ? 'bg-purple-500/5 dark:bg-[#150f24]/30 text-zinc-800 dark:text-zinc-200 border-purple-200/40 dark:border-purple-500/20' 
                  : 'bg-blue-500/5 dark:bg-[#0b1424]/30 text-zinc-800 dark:text-zinc-200 border-blue-200/40 dark:border-blue-500/20'
              }`}>
                {msg.text}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-zinc-200 dark:border-[#171c26] pt-4 mt-2">
        <input 
          type="text" 
          placeholder="Ask AI Coach for DP hints..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-zinc-50 dark:bg-[#0c0e14]/65 border border-zinc-200 dark:border-[#171c26] focus:border-[#2563eb] rounded px-4 py-3.5 text-xs focus:outline-none text-zinc-950 dark:text-white font-mono transition-colors"
        />
        <button 
          type="submit"
          className="bg-[#2563eb] hover:bg-[#3b82f6] text-white px-5 py-3.5 rounded shadow-md transition-all shadow-blue-500/10 flex items-center justify-center cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
