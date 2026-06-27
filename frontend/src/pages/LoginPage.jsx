import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Code, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react'
import { apiFetch } from '../config'

const syncLogs = [
  "Contacting LeetCode servers...",
  "User profile resolved successfully.",
  "Fetching submission logs (last 300 solves)...",
  "Categorizing by DSA topic tags...",
  "Determining DNA personality traits...",
  "Calibrating growth velocity model...",
  "Sync completed. Profile ready."
]

const getStatusLabel = (step) => {
  switch (step) {
    case 0: return "CONNECTING GATEWAY"
    case 1: return "RESOLVING PROFILE"
    case 2: return "FETCHING METRICS"
    case 3: return "CATEGORIZING DATA"
    case 4: return "PARSING DNA"
    case 5: return "CALIBRATING MODEL"
    case 6: return "OPTIMIZING CONTEXT"
    default: return "AWAITING SYNC"
  }
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStep, setSyncStep] = useState(0)
  const [syncComplete, setSyncComplete] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [syncStats, setSyncStats] = useState({
    solved: 0,
    rating: 1500,
    badge: 'N/A'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedUser = username.trim()
    if (!trimmedUser) return

    setIsSyncing(true)
    setErrorMsg(null)
    setSyncStep(0)
    setSyncComplete(false)

    // Progress visually through the initial boot steps while fetching
    let currentStep = 0
    const logInterval = setInterval(() => {
      setSyncStep((prev) => {
        if (prev < 3) { // Autoplay the first few steps while waiting
          currentStep = prev + 1
          return prev + 1
        }
        return prev
      })
    }, 450)

    try {
      const response = await apiFetch('/api/v1/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: trimmedUser })
      });

      clearInterval(logInterval)

      const result = await response.json();

      if (!response.ok || result.status === 'fail' || result.status === 'error') {
        throw new Error(result.message || 'Synchronization failed');
      }

      // Store LeetCode profile statistics
      const solved = result.data.solvedStats?.all || 0;
      const rating = result.data.contest?.currentRating || 0;
      const ranking = result.data.profile?.ranking;
      setSyncStats({
        solved,
        rating,
        badge: ranking ? `Rank #${ranking}` : 'None'
      });

      // Save username to local storage
      localStorage.setItem('leetcode_username', trimmedUser);

      // Progress through remaining steps organically with short delay
      for (let step = currentStep; step < syncLogs.length; step++) {
        setSyncStep(step);
        await new Promise((r) => setTimeout(r, 200));
      }
      setSyncComplete(true);
    } catch (err) {
      clearInterval(logInterval);
      setErrorMsg(err.message);
      setIsSyncing(false);
    }
  }

  const handleReset = () => {
    setIsSyncing(false)
    setSyncComplete(false)
    setErrorMsg(null)
    setUsername('')
  }

  // Calculate dynamic progress values
  let percent = 0
  let statusLabel = "AWAITING SYNC"
  if (isSyncing && !syncComplete) {
    percent = Math.min(95, Math.floor(((syncStep + 1) / syncLogs.length) * 100))
    statusLabel = getStatusLabel(syncStep)
  } else if (syncComplete) {
    percent = 100
    statusLabel = "OPTIMIZED CONTEXT"
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-zinc-100 flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-950/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navigation Back Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors bg-zinc-950/40 border border-zinc-900 px-4 py-2 rounded-xl backdrop-blur-md z-20 shadow-md hover:border-zinc-800"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Main Grid Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-24 flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Terminal Card & Description */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center space-y-8">
          
          {/* macOS Style Terminal Card */}
          <div className="bg-[#0f111a] border border-[#1e2230] rounded-xl shadow-2xl overflow-hidden font-mono text-[13px] leading-relaxed w-full max-w-[480px]">
            {/* Window header */}
            <div className="bg-[#161925] border-b border-[#222739] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#eab308] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e] opacity-80" />
              </div>
              <span className="text-[11px] text-[#64748b] font-medium tracking-tight">auth – growcode@local – 80x24</span>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-4 text-left">
                         {!isSyncing && !syncComplete ? (
                /* STATE 1: Initial Form State */
                <>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[#22c55e]">system@growcode:~$</span> <span className="text-zinc-100">init auth_flow --secure</span>
                    </div>
                    <div className="text-cyan-400">Establishing encrypted tunnel to core-services...</div>
                    <div className="text-emerald-400">[OK] Tunnel verified. Identity required.</div>
                  </div>

                  <div className="text-blue-500 font-bold tracking-wider pt-2 uppercase text-xs">ENTER LEETCODE USERNAME</div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative flex items-center bg-[#07080d] border border-[#2563eb]/45 focus-within:border-[#2563eb] rounded-lg px-3 py-2.5 transition-all shadow-inner">
                      <span className="text-blue-500 font-bold mr-3 select-none">&gt;</span>
                      <input 
                        type="text" 
                        placeholder="INPUT_LEETCODE_ID"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-transparent border-none text-zinc-100 placeholder-zinc-700 outline-none focus:ring-0 text-[13px] font-mono tracking-wide"
                        required
                      />
                      <span className="w-2 h-4 bg-blue-500 animate-pulse ml-1 shrink-0" />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-xs tracking-wider font-mono shadow-md shadow-blue-600/10"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-pulse" />
                      [ EXECUTE SYNC ]
                    </button>
                  </form>
                  {errorMsg && (
                    <div className="text-rose-500 font-mono text-[11px] mt-2 flex items-start gap-1.5 bg-rose-950/15 border border-rose-900/30 p-2.5 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      <span><strong>[ERROR]:</strong> {errorMsg}</span>
                    </div>
                  )}
                  <div className="text-zinc-700 text-[10px] pt-1">v4.0.2-stable</div>
                </>
              ) : isSyncing && !syncComplete ? (
                /* STATE 2: Syncing Profile Console logs */
                <>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[#22c55e]">system@growcode:~$</span> <span className="text-zinc-100">init auth_flow --secure</span>
                    </div>
                    <div className="text-cyan-400">Establishing encrypted tunnel to core-services...</div>
                    <div className="text-emerald-400">[OK] Tunnel verified. Identity required.</div>
                    <div className="pt-2">
                      <span className="text-[#22c55e]">system@growcode:~$</span> <span className="text-zinc-100">sync --user {username}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-[12.5px] text-zinc-400 pt-1">
                    {syncLogs.slice(0, syncStep + 1).map((log, idx) => {
                      const isCurrent = idx === syncStep;
                      return (
                        <div key={idx} className="flex gap-2 items-start transition-all duration-300">
                          {isCurrent ? (
                            <span className="text-cyan-400 font-bold animate-pulse">❯</span>
                          ) : (
                            <span className="text-zinc-500">[INFO]</span>
                          )}
                          <span className={isCurrent ? "text-zinc-100 font-medium" : "text-zinc-500"}>
                            {log}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-zinc-700 text-[10px] pt-2">v4.0.2-stable</div>
                </>
              ) : (
                /* STATE 3: Success Screen Inside Console */
                <>
                  <div className="space-y-1">
                    <div>
                      <span className="text-[#22c55e]">system@growcode:~$</span> <span className="text-zinc-100">init auth_flow --secure</span>
                    </div>
                    <div className="text-cyan-400">Establishing encrypted tunnel to core-services...</div>
                    <div className="text-emerald-400">[OK] Tunnel verified. Identity required.</div>
                    <div className="pt-2">
                      <span className="text-[#22c55e]">system@growcode:~$</span> <span className="text-zinc-100">sync --user {username}</span>
                    </div>
                    {syncLogs.map((log, idx) => (
                      <div key={`log-${idx}`} className="text-zinc-500">
                        <span>[INFO] </span>{log}
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-zinc-900 space-y-1.5 text-zinc-400">
                    <div>[OK] <span className="text-emerald-400">{syncStats.solved} solved questions</span> parsed successfully.</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-1 text-[12px]">
                      <div>DNA: <span className="text-blue-400 font-semibold">{syncStats.rating > 2000 ? 'Guardian' : syncStats.rating > 1700 ? 'Knight' : 'Coder'}</span></div>
                      <div>BADGE: <span className="text-rose-400 font-semibold text-ellipsis overflow-hidden whitespace-nowrap inline-block max-w-[85px]" title={syncStats.badge}>{syncStats.badge}</span></div>
                      <div>RATING: <span className="text-amber-400 font-semibold">{syncStats.rating.toLocaleString()}</span></div>
                    </div>
                    <div className="text-emerald-400 font-bold pt-1">[OK] Authorization tunnel established.</div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link 
                      to="/dashboard"
                      className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs tracking-wider font-mono text-center shadow-md shadow-blue-600/10"
                    >
                      [ ENTER DASHBOARD ]
                    </Link>
                    <button 
                      onClick={handleReset}
                      className="w-full text-zinc-600 hover:text-zinc-400 font-semibold text-center text-[10.5px] py-1 transition-colors cursor-pointer"
                    >
                      [ Reset Username ]
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Description Text below terminal */}
          <div className="text-left space-y-4 max-w-[480px]">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Velocity starts <span className="text-[#2563eb]">here.</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Connect your leetcode ecosystem to GrowCode and unlock AI-powered insights across your entire stack.
            </p>
          </div>

        </div>

        {/* Right Column: Desk Setup Workspace Image Overlay */}
        <div className="col-span-12 md:col-span-6 flex justify-center w-full">
          
          <div className="relative w-full max-w-[480px] aspect-[4/3.8] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
            {/* The desk setup mock image */}
            <img 
              src="/workspace_mockup.png" 
              className="w-full h-full object-cover select-none pointer-events-none" 
              alt="Workspace Desk Mockup" 
            />

            {/* SYNC ACTIVE Badge */}
            <div className="absolute top-4 left-4 bg-black/55 border border-zinc-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className={`w-2 h-2 rounded-full bg-[#22c55e] ${isSyncing && !syncComplete ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300">
                {syncComplete ? 'SYNC READY' : isSyncing ? 'SYNCING DATA' : 'SYNC ACTIVE'}
              </span>
            </div>

            {/* GrowCode CLI Glassmorphic Status Box */}
            <div className="absolute bottom-6 right-6 w-[230px] bg-black/65 border border-zinc-800/80 backdrop-blur-xl rounded-xl p-4 shadow-2xl text-left font-mono">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-6.5 h-6.5 rounded bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center">
                  <Code className="w-3.5 h-3.5 text-[#2563eb]" />
                </div>
                <div>
                  <div className="text-[10.5px] font-bold text-white leading-tight">GrowCode CLI</div>
                  <div className="text-[7.5px] text-zinc-500 font-bold tracking-wider">GLOBAL STATUS</div>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full bg-zinc-900 rounded-full h-1.5 mb-2 overflow-hidden border border-zinc-800/40">
                <div 
                  className="bg-[#2563eb] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[8.5px] text-zinc-400 font-bold">
                <span className="tracking-wide">{statusLabel}</span>
                <span className="text-zinc-200">{percent}%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-400">GROWCODE</span>
          <span className="text-zinc-800 font-normal">|</span>
          <span>© {new Date().getFullYear()} GrowCode Intelligence. All systems operational.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#terms" className="hover:text-zinc-400 transition-colors">Terms</a>
          <a href="#privacy" className="hover:text-zinc-400 transition-colors">Privacy</a>
          <a href="#docs" className="hover:text-zinc-400 transition-colors">API Docs</a>
          <a href="#changelog" className="hover:text-zinc-400 transition-colors">Changelog</a>
        </div>
      </footer>

    </div>
  )
}
