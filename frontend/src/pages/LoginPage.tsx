import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Terminal, 
  Code, 
  ArrowLeft, 
  CheckCircle2, 
  Trophy, 
  Zap,
  Activity,
  AlertCircle
} from 'lucide-react'

const syncLogs = [
  "Contacting LeetCode servers...",
  "User profile resolved successfully.",
  "Fetching submission logs (last 300 solves)...",
  "Categorizing by DSA topic tags...",
  "Determining DNA personality traits...",
  "Calibrating growth velocity model...",
  "Sync completed. Profile ready."
]

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStep, setSyncStep] = useState(0)
  const [syncComplete, setSyncComplete] = useState(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isSyncing) {
      setSyncStep(0)
      setSyncComplete(false)
      interval = setInterval(() => {
        setSyncStep((prev) => {
          if (prev >= syncLogs.length - 1) {
            clearInterval(interval)
            setSyncComplete(true)
            return prev
          }
          return prev + 1
        })
      }, 800)
    }
    return () => clearInterval(interval)
  }, [isSyncing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return
    setIsSyncing(true)
  }

  const handleReset = () => {
    setIsSyncing(false)
    setSyncComplete(false)
    setUsername('')
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-zinc-100 flex items-center justify-center p-4 overflow-hidden grid-bg">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-950/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Blurred Background Code Code Overlay */}
      <div className="absolute top-12 left-12 font-mono text-[11px] text-zinc-800/10 select-none pointer-events-none hidden md:block leading-relaxed z-0">
        <pre>{`function optimize(tree) {
  return tree.map(node => {
    if (node.type === 'branch') {
      return {
        ...node,
        children: optimize(node.children)
      };
    }
    return node;
  });
}`}</pre>
      </div>

      <div className="absolute bottom-16 right-16 font-mono text-[11px] text-zinc-800/10 select-none pointer-events-none hidden md:block leading-relaxed z-0">
        <pre>{`const predictGrowth = (history) => {
  const velocity = history.reduce((sum, rate) => sum + rate, 0) / history.length;
  return Array.from({ length: 6 }).map((_, i) => ({
    month: getFutureMonth(i),
    score: Math.floor(history[history.length - 1] + (velocity * i * 1.15))
  }));
};`}</pre>
      </div>

      {/* Navigation Back Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-950/40 border border-zinc-900 px-3.5 py-2 rounded-xl backdrop-blur-sm z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Login Card Shell */}
      <div className="relative z-10 w-full max-w-[420px] transition-all duration-300">
        
        {!isSyncing ? (
          /* STATE 1: Default Sync Form */
          <div className="glass-card rounded-[28px] p-8 sm:p-10 shadow-2xl border border-zinc-800/60 bg-zinc-950/45 backdrop-blur-md">
            
            {/* Logo Row */}
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-brand-indigo/10 border border-brand-indigo/25 flex items-center justify-center shadow-sm">
                <Terminal className="w-5 h-5 text-brand-indigo" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-brand-indigo">
                GrowCode
              </span>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl text-white tracking-tight leading-tight mb-2">
                Level Up Your Career
              </h2>
              <p className="text-zinc-400 text-sm">
                Synchronize your engineering journey.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-widest text-zinc-500 uppercase font-bold mb-2.5">
                  LEETCODE USERNAME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Code className="w-4 h-4 text-zinc-500" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="e.g. alanturing"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#0a0e1a]/80 border border-zinc-800 focus:border-brand-indigo rounded-xl pl-11 pr-4 py-3.5 text-sm font-mono focus:outline-none text-white placeholder-zinc-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-indigo/20 hover:shadow-brand-indigo/40 active:scale-[0.98]"
              >
                Sync Profile
              </button>
            </form>
          </div>
        ) : !syncComplete ? (
          /* STATE 2: Syncing Profile Loading Screen */
          <div className="glass-card rounded-[28px] p-8 sm:p-10 shadow-2xl border border-brand-indigo/35 bg-zinc-950/65 backdrop-blur-md text-center">
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
              <div className="absolute inset-0 rounded-full border-4 border-t-brand-indigo border-r-brand-purple animate-spin" />
              <Activity className="w-6 h-6 text-brand-indigo" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Retrieving {username}</h3>
            <p className="text-zinc-400 text-xs mb-6">
              Analyzing algorithmic solve trajectory...
            </p>

            {/* Syncing Progress Logs */}
            <div className="bg-zinc-950/95 border border-zinc-900 rounded-xl p-4 text-left font-mono text-[11px] text-zinc-400 h-36 overflow-y-auto space-y-2 shadow-inner">
              {syncLogs.slice(0, syncStep + 1).map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-brand-indigo font-bold">{idx === syncStep ? '❯' : '✔'}</span>
                  <span className={idx === syncStep ? "text-zinc-200" : "text-zinc-500"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* STATE 3: Sync Completed / Success Screen */
          <div className="glass-card rounded-[28px] p-8 sm:p-10 shadow-2xl border border-emerald-500/25 bg-zinc-950/65 backdrop-blur-md text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 shadow-inner shadow-emerald-500/5">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Sync Complete!</h3>
            <p className="text-zinc-400 text-sm mb-6">
              We parsed <strong>247 solved questions</strong> for <strong>{username}</strong>.
            </p>

            {/* Small Preview Stats Card */}
            <div className="bg-zinc-950/70 border border-zinc-900 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-2 text-left">
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">DNA</span>
                <span className="text-xs font-bold text-zinc-200 flex items-center gap-1 mt-0.5">
                  <Zap className="w-3 h-3 text-brand-indigo" />
                  Speedster
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">WEAKNESS</span>
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3 text-rose-400" />
                  Graphs
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">RATING</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Trophy className="w-3 h-3 text-emerald-400" />
                  1,842
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                to="/"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 active:scale-[0.98]"
              >
                Go to Dashboard
              </Link>
              <button 
                onClick={handleReset}
                className="w-full text-zinc-500 hover:text-zinc-400 font-medium text-xs py-1 transition-colors"
              >
                Try Different Username
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
