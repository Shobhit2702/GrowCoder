import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Terminal, 
  Beaker, 
  Brain, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Code
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts'

const performanceData = [
  { month: 'Jan', performance: 1200, prediction: null },
  { month: 'Feb', performance: 1450, prediction: null },
  { month: 'Mar', performance: 1720, prediction: null },
  { month: 'Apr', performance: 2100, prediction: 2100 },
  { month: 'May', performance: null, prediction: 2320 },
  { month: 'Jun', performance: null, prediction: 2482 }
]

const syncLogs = [
  "Establishing connection with LeetCode GraphQL server...",
  "Retrieving contest ranking history...",
  "Parsing submission patterns for 'Dynamic Programming' & 'Graphs'...",
  "Running deterministic Topic Strength calculations...",
  "Structuring AI Coding DNA profile...",
  "Optimizing custom recommended problem lists...",
  "Generating 30-day growth predictions..."
]

export default function LandingPage() {
  const [username, setUsername] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStep, setSyncStep] = useState(0)
  const [syncComplete, setSyncComplete] = useState(false)

  const handleStartAnalysis = (e) => {
    e.preventDefault()
    if (!username.trim()) return
    setIsSyncing(true)
    setSyncStep(0)
    setSyncComplete(false)
    
    const interval = setInterval(() => {
      setSyncStep((prev) => {
        if (prev >= syncLogs.length - 1) {
          clearInterval(interval)
          setSyncComplete(true)
          return prev
        }
        return prev + 1
      })
    }, 900)
  }

  const handleReset = () => {
    setIsSyncing(false)
    setSyncComplete(false)
    setUsername('')
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-zinc-100 overflow-x-hidden grid-bg">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-glow z-0" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[200px] left-0 w-[450px] h-[450px] bg-purple-950/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#030712]/75 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center shadow-lg shadow-brand-indigo/25">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white bg-gradient-to-r from-white to-zinc-300 bg-clip-text">
              GrowCode
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">DNA Dashboard</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              to="/login"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md"
            >
              Log In
            </Link>
            <Link 
              to="/login"
              className="hidden sm:inline-flex text-sm font-medium bg-brand-indigo hover:bg-brand-indigo/90 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-brand-indigo/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pt-12 pb-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-xs font-semibold text-brand-indigo tracking-wider uppercase mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            AI-POWERED DEVELOPMENT
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white max-w-2xl leading-[1.1] mb-6">
            GrowCode: Your Personal <span className="bg-gradient-to-r from-blue-500 via-brand-indigo to-brand-purple bg-clip-text text-transparent">AI Coding Coach</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Analyze your LeetCode journey, discover weaknesses, predict growth, and get personalized improvement plans powered by AI.
          </p>

          <div className="flex justify-center w-full">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-indigo/25 hover:shadow-brand-indigo/40"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* INTERACTIVE DEMO CARD / CHART MOCKUP */}
        <section id="demo" className="mb-20 scroll-mt-24">
          {!isSyncing ? (
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-500 animate-glow">
              {/* LeetCode Sync Interactive Bar */}
              <div className="border-b border-zinc-800/60 pb-6 mb-6">
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-indigo" />
                  Try it Live: Sync Your LeetCode Profile
                </h3>
                <form onSubmit={handleStartAnalysis} className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Enter LeetCode username (e.g. tourist)" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-indigo text-white placeholder-zinc-500 transition-colors"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-brand-indigo hover:bg-brand-indigo/90 text-white px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-md shadow-brand-indigo/15 hover:shadow-brand-indigo/30"
                  >
                    Analyze
                  </button>
                </form>
              </div>

              {/* Performance Score & Gauge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold">PERFORMANCE SCORE</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">2,482</span>
                    <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" />
                      +12%
                    </span>
                  </div>
                </div>

                {/* Circular Score Badge */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle 
                      cx="28" 
                      cy="28" 
                      r="24" 
                      stroke="#1e1b4b" 
                      strokeWidth="3.5" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="28" 
                      cy="28" 
                      r="24" 
                      stroke="#4f46e5" 
                      strokeWidth="3.5" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 * (1 - 0.84)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-sm font-bold text-white relative z-10">84</span>
                </div>
              </div>

              {/* Recharts Graphical Display */}
              <div className="h-48 sm:h-56 w-full relative mb-6">
                <div className="absolute top-2 right-12 z-20 glass-card bg-zinc-950/90 text-[10px] tracking-wider text-emerald-400 font-bold px-2.5 py-1 rounded-md border border-emerald-500/25 flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  PREDICTED GROWTH
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="month" 
                      stroke="#52525b" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#52525b" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[1000, 2600]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#09090b', 
                        borderColor: '#27272a',
                        borderRadius: '12px',
                        color: '#f4f4f5',
                        fontSize: '12px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#4f46e5" 
                      strokeWidth={3}
                      dot={{ r: 4, stroke: '#818cf8', strokeWidth: 2, fill: '#030712' }}
                      activeDot={{ r: 6 }}
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      strokeDasharray="4 4"
                      dot={false}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Card Content: Algorithms & DS Progress + floating badge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end relative">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-1">
                      <span>ALGORITHMS</span>
                      <span className="text-brand-blue">82%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-1">
                      <span>DATA STRUCTURES</span>
                      <span className="text-brand-purple">74%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand-purple h-1.5 rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>
                </div>

                <div className="flex md:justify-end mt-4 md:mt-0">
                  <div className="glass-card bg-[#10b981]/5 border-[#10b981]/20 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-bold text-emerald-400 shadow-sm shadow-emerald-500/5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    AI STRATEGY OPTIMIZED
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DYNAMIC SYNCING SCREEN (Simulating Analysis) */
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden transition-all duration-500 border-brand-indigo/30 bg-zinc-950/70">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-brand-indigo border-r-brand-purple animate-spin" />
                  <Terminal className="w-8 h-8 text-zinc-400 relative z-10" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Analyzing Profile: {username}</h3>
                <p className="text-zinc-400 text-sm max-w-md mb-8">
                  Please hold on while the CodePilot Core pulls metrics directly from LeetCode.
                </p>

                <div className="w-full max-w-md bg-zinc-900 rounded-full h-2 mb-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-indigo to-brand-purple h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${((syncStep + 1) / syncLogs.length) * 100}%` }}
                  />
                </div>

                <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-left font-mono text-xs text-zinc-400 h-28 overflow-y-auto space-y-2.5 shadow-inner">
                  {syncLogs.slice(0, syncStep + 1).map((log, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span className="text-brand-indigo font-bold">{index === syncStep && !syncComplete ? '❯' : '✔'}</span>
                      <span className={index === syncStep && !syncComplete ? "text-zinc-200" : "text-zinc-500"}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>

                {syncComplete && (
                  <button 
                    onClick={handleReset}
                    className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Reset & Try Another Account
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* UNCOVER YOUR POTENTIAL FEATURES SECTION */}
        <section id="features" className="mb-20 scroll-mt-24">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-display font-extrabold text-3xl tracking-tight text-white mb-2 inline-block relative">
              Uncover Your Potential
            </h2>
            <div className="w-16 h-1 bg-brand-indigo rounded mt-1.5 mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            
            {/* Feature 1: Coding DNA */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Code className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-2">Coding DNA Analysis</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Deep-dive into your problem-solving patterns. We map your logical strengths across 24 technical dimensions.
                </p>
              </div>
            </div>

            {/* Feature 2: Weakness Detection */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Beaker className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-2">Weakness Detection</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Identify specific algorithmic blind spots before recruiters do. Get heatmaps of where your performance drops.
                </p>
              </div>
            </div>

            {/* Feature 3: AI Recommendations */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-2">AI Recommendations</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Receive daily customized LeetCode plans that evolve as you improve. Your path to Big Tech, automated.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CALL TO ACTION CONTAINER */}
        <section id="pricing" className="mb-20">
          <div className="border border-dashed border-zinc-800 rounded-2xl p-8 sm:p-12 text-center bg-zinc-950/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl" />
            
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Ready to level up?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Join 50,000+ engineers optimizing their growth and cracking FAANG interviews.
            </p>

            <Link 
              to="/login"
              className="inline-flex items-center justify-center bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-indigo/15 hover:shadow-brand-indigo/30"
            >
              Start Analysis Now
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
              <Terminal className="w-3 h-3 text-zinc-400" />
            </div>
            <span className="font-bold text-zinc-400">GrowCode</span>
          </div>
          <div>
            © {new Date().getFullYear()} GrowCode. All rights reserved. Made for elite developers.
          </div>
        </div>
      </footer>
    </div>
  )
}
