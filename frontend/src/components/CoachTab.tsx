import { useState } from 'react'
import { 
  Flame, 
  ChevronRight, 
  Check, 
  Lightbulb, 
  Bookmark, 
  Sparkles, 
  User, 
  Send, 
  ArrowRight 
} from 'lucide-react'

export default function CoachTab() {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Welcome to today's Dynamic Programming session! Let's address your state definition bottleneck. We will drill 'Word Break II'. Ready to review the recursive formula?" }
  ])
  const [input, setInput] = useState('')
  
  // Interactive checklist states
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'System Design: Bloom Filters', checked: false },
    { id: 2, text: 'Review Spaced Repetition Cards', checked: true }
  ])

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInput('')

    // Simulate live AI reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `Good point. To define the states for Word Break II, let dp[i] represent if s[0...i] can be segmented. Since we need the actual sentences, we store the lists of paths at each DP index. Let's trace it on paper or write code below!` 
      }])
    }, 1000)
  }

  // STATE A: Main AI Coach Dashboard
  if (!isSessionActive) {
    return (
      <div className="space-y-6">
        {/* Header Row with Streak */}
        <section className="flex justify-between items-start gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              AI Coach
            </h1>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              CO-PILOT ACTIVE
            </span>
          </div>

          {/* Streak Flame Badge */}
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 border-brand-purple/20 bg-brand-purple/5 shadow-md shadow-brand-purple/5">
            <Flame className="w-4 h-4 text-brand-purple fill-brand-purple/20 animate-pulse" />
            <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">27 Days</span>
          </div>
        </section>

        {/* TODAY'S FOCUS CARD */}
        <section className="glass-card rounded-[24px] p-6 bg-brand-indigo/5 border border-brand-indigo/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-[9px] tracking-widest text-brand-indigo uppercase font-extrabold block mb-2 font-mono">
            TODAY'S FOCUS
          </span>
          <h2 className="font-display font-extrabold text-3xl text-zinc-900 dark:text-white tracking-tight mb-6">
            Dynamic Programming
          </h2>

          {/* Target and Est Column Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-200/50 dark:border-zinc-900 pt-5 mb-6 font-mono">
            <div>
              <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Target Questions</span>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                5 <span className="text-xs text-zinc-400 font-medium">Total</span>
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Est. Time</span>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1 block">
                90 <span className="text-xs text-zinc-400 font-medium">min</span>
              </span>
            </div>
          </div>

          <button 
            className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-indigo/15 hover:shadow-brand-indigo/35 flex items-center justify-center gap-2 text-sm"
            onClick={() => setIsSessionActive(true)}
          >
            Start Session
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* DAILY CHECKLIST */}
        <section className="space-y-3">
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold block font-mono">
            DAILY CHECKLIST
          </span>

          <div className="space-y-2.5">
            {checklist.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-950/20 transition-all select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-400 dark:border-zinc-800 bg-transparent'}`}>
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                  <span className={`text-xs font-semibold ${item.checked ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-200'}`}>
                    {item.text}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            ))}
          </div>
        </section>

        {/* SMART PATH RECOMMENDATIONS */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[9px] tracking-widest text-zinc-500 uppercase font-bold font-mono">
              SMART PATH
            </span>
            <button className="text-xs font-bold text-brand-indigo hover:underline" onClick={() => alert('Viewing all paths...')}>
              View All
            </button>
          </div>

          <div className="space-y-4">
            {/* Recommended Problem 1 */}
            <div className="glass-card rounded-[22px] p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Word Break II</h3>
                <span className="text-[9px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">Hard</span>
              </div>

              {/* AI Reason callout */}
              <div className="bg-brand-indigo/5 border border-brand-indigo/15 dark:border-brand-indigo/10 rounded-xl p-3.5 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                <div className="text-[11px] leading-normal text-zinc-600 dark:text-zinc-400">
                  <span className="font-bold text-brand-indigo">AI Reason: </span>
                  Recommended because your DP accuracy is 37%. Practice backtracking with memoization.
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-zinc-200 dark:bg-zinc-100 hover:bg-zinc-300 dark:hover:bg-white text-zinc-900 font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                  onClick={() => setIsSessionActive(true)}
                >
                  Solve Now
                </button>
                <button 
                  className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 flex items-center justify-center text-zinc-400 transition-colors"
                  onClick={() => alert('Bookmarked Word Break II')}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommended Problem 2 */}
            <div className="glass-card rounded-[22px] p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Edit Distance</h3>
                <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Medium</span>
              </div>

              <div className="bg-brand-indigo/5 border border-brand-indigo/15 dark:border-brand-indigo/10 rounded-xl p-3.5 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                <div className="text-[11px] leading-normal text-zinc-600 dark:text-zinc-400">
                  <span className="font-bold text-brand-indigo">AI Reason: </span>
                  Completes your "Classic String DP" cluster. High relevance for FAANG interviews.
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-zinc-200 dark:bg-zinc-100 hover:bg-zinc-300 dark:hover:bg-white text-zinc-900 font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                  onClick={() => setIsSessionActive(true)}
                >
                  Solve Now
                </button>
                <button 
                  className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 flex items-center justify-center text-zinc-400 transition-colors"
                  onClick={() => alert('Bookmarked Edit Distance')}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }

  // STATE B: Active AI Chat Coach Session
  return (
    <div className="glass-card rounded-[28px] p-6 h-[550px] flex flex-col justify-between relative overflow-hidden bg-zinc-950/40">
      
      {/* Chat Session Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-4 mb-2">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsSessionActive(false)}
            className="text-xs font-bold text-brand-indigo hover:underline"
          >
            ← End Drill
          </button>
          <span className="text-zinc-400">|</span>
          <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">DP Optimization Session</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Messaging Box */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white ${msg.sender === 'user' ? 'bg-brand-purple' : 'bg-brand-indigo'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={`rounded-2xl p-3.5 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-brand-purple/10 text-zinc-800 dark:text-zinc-200 border border-brand-purple/20' : 'bg-brand-indigo/10 text-zinc-800 dark:text-zinc-200 border border-brand-indigo/20'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-zinc-200 dark:border-zinc-900 pt-4 mt-2">
        <input 
          type="text" 
          placeholder="Ask AI Coach for DP hints..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 focus:border-brand-indigo rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white font-mono"
        />
        <button 
          type="submit"
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white px-4 py-3 rounded-xl shadow-md transition-all shadow-brand-indigo/10 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
