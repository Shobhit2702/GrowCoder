import { useState } from 'react'
import { 
  CircleUser, 
  Moon, 
  Sun, 
  Bell, 
  ChevronRight, 
  LogOut,
  Send,
  Mail,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

import { useEffect } from 'react'
import { apiFetch } from '../config'

export default function SettingsTab({ isDark, setIsDark, handleLogout, onSettingsChanged, data }) {
  const [username] = useState(() => localStorage.getItem('leetcode_username') || 'alanturing')
  const [dailyTarget, setDailyTarget] = useState(() => data?.dailyTarget || 4)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  
  // Sub-navigation state: null | 'help' | 'terms' | 'privacy'
  const [activeSubView, setActiveSubView] = useState(null)

  // Message form states (Help Center)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!username || dailyTarget === data?.dailyTarget) return;

    const saveDailyTarget = async () => {
      try {
        const response = await apiFetch(`/api/v1/dashboard/${username}/settings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dailyTarget })
        });
        const result = await response.json();
        if (!response.ok || result.status === 'fail') {
          throw new Error(result.message || 'Failed to save settings');
        }
        if (onSettingsChanged) onSettingsChanged();
      } catch (err) {
        console.error('Error saving settings:', err);
      }
    };

    const delayDebounce = setTimeout(() => {
      saveDailyTarget();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [dailyTarget, username, onSettingsChanged, data]);

  const handleSyncNow = async () => {
    setIsSyncing(true)
    try {
      const response = await apiFetch('/api/v1/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const result = await response.json();
      if (!response.ok || result.status === 'fail') {
        throw new Error(result.message || 'Sync failed');
      }
      alert('Leetcode profile synced successfully!')
      if (onSettingsChanged) onSettingsChanged();
    } catch (err) {
      alert(`Sync error: ${err.message}`);
    } finally {
      setIsSyncing(false)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim() || !email.trim()) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setMessageSent(true)
      setMessage('')
      setEmail('')
      setTimeout(() => setMessageSent(false), 4000)
    }, 1500)
  }

  // --- Sub-View: Help Center ---
  if (activeSubView === 'help') {
    return (
      <div className="space-y-6 max-w-lg mx-auto pb-12">
        <button 
          onClick={() => setActiveSubView(null)} 
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Settings
        </button>

        <section className="mb-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Help Center
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5 leading-relaxed">
            Need support? Contact us or drop a message directly.
          </p>
        </section>

        {/* Contact Info Card */}
        <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[9px] tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-bold font-mono">
              FOUNDER CONTACT EMAIL
            </span>
            <a 
              href="mailto:founder@growcode.ai" 
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mt-0.5 block leading-none"
            >
              founder@growcode.ai
            </a>
          </div>
        </section>

        {/* Drop Message Card */}
        <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-zinc-900 dark:text-white font-bold text-lg mb-1">
            Drop a Message
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-5">
            Drop us your queries, feedback, or custom request. The founder reviews every message.
          </p>

          {messageSent && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-2.5 mb-5 animate-pulse">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold leading-relaxed">
                Message sent successfully! Our founder will get back to you shortly.
              </p>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-[9px] tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-bold mb-2 font-mono">
                Your Email
              </label>
              <input 
                type="email" 
                placeholder="e.g. coder@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-bold mb-2 font-mono">
                Your Message
              </label>
              <textarea 
                rows={4}
                placeholder="How can we help optimize your AI environment?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 text-xs flex items-center justify-center gap-2 select-none cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>
    )
  }

  // --- Sub-View: Terms of Service ---
  if (activeSubView === 'terms') {
    return (
      <div className="space-y-6 max-w-lg mx-auto pb-12">
        <button 
          onClick={() => setActiveSubView(null)} 
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Settings
        </button>

        <section className="mb-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5 leading-relaxed">
            Please read these terms carefully before using GrowCode.
          </p>
        </section>

        <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              1. Acceptance of Terms
            </h4>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
              By accessing and using GrowCode ("the Platform"), you agree to be bound by these simplified terms. If you do not agree to all terms, please do not use the Platform.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              2. License & Access
            </h4>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
              We grant you a personal, non-transferable, and non-exclusive license to use our AI coaching, rating predictions, and weakness diagnostic tools for your personal career growth.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              3. User Data & Synchronization
            </h4>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
              Your synced LeetCode profile data and solve statistics remain your property. By syncing, you authorize GrowCode to query public solve details for personalized diagnostic calculations.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              4. Code of Conduct
            </h4>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
              You agree not to reverse-engineer our AI models, distribute harmful code, run automated scraping routines, or attempt to bypass security boundaries on our servers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              5. Disclaimer of Warranties
            </h4>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
              GrowCode's diagnostic feedback and ELO growth predictions are provided "as-is." While we optimize algorithms to guarantee top technical alignment, we do not guarantee specific tech hiring outcomes.
            </p>
          </div>
        </section>
      </div>
    )
  }

  // --- Sub-View: Privacy Policy ---
  if (activeSubView === 'privacy') {
    return (
      <div className="space-y-6 max-w-lg mx-auto pb-12">
        <button 
          onClick={() => setActiveSubView(null)} 
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Settings
        </button>

        <section className="mb-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5 leading-relaxed">
            How we protect and manage your developer data.
          </p>
        </section>

        <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              1. Information We Collect
            </h4>
            <p className="text-xs text-zinc-655 dark:text-zinc-300 leading-relaxed">
              We collect your public LeetCode username, public submission logs, and solve counts. We do <strong>not</strong> collect or store your LeetCode password or other personal credentials.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              2. How We Use Data
            </h4>
            <p className="text-xs text-zinc-655 dark:text-zinc-300 leading-relaxed">
              We process public data to personalize your AI Coaching roadmap, diagnose algorithmic weaknesses, track daily solve consistency streaks, and chart global rating ELO projections.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              3. Data Protection
            </h4>
            <p className="text-xs text-zinc-655 dark:text-zinc-300 leading-relaxed">
              All synced data and coaching chat transcripts are encrypted in transit using SSL/TLS and stored securely. We do not sell or lease developer data to third-party recruitment agencies.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase font-display">
              4. Cookies & Session Storage
            </h4>
            <p className="text-xs text-zinc-655 dark:text-zinc-300 leading-relaxed">
              We use standard local storage browser cookies to store user theme preferences (light/dark mode status) and active dashboard panel routers.
            </p>
          </div>
        </section>
      </div>
    )
  }

  // --- Main Settings View ---
  return (
    <div className="space-y-6 max-w-lg mx-auto pb-12">
      {/* Title Header */}
      <section className="mb-2">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1.5 leading-relaxed font-semibold">
          Configure your AI-powered engineering environment.
        </p>
      </section>

      {/* LeetCode Username Card */}
      <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
            <CircleUser className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[9px] tracking-widest text-zinc-500 dark:text-zinc-450 uppercase font-bold font-mono">
              LEETCODE USERNAME
            </span>
            <span className="text-xl font-extrabold text-zinc-900 dark:text-white mt-0.5 block leading-none">
              {username}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSyncing ? 'bg-blue-500 animate-spin border-2 border-transparent border-t-white' : 'bg-emerald-500'}`} />
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {isSyncing ? 'Syncing Trajectory...' : 'Profile Synced'}
            </span>
          </div>
          <button 
            type="button"
            disabled={isSyncing}
            onClick={handleSyncNow}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10 disabled:opacity-50 select-none cursor-pointer"
          >
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </section>

      {/* Daily Target Card */}
      <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-zinc-900 dark:text-white font-bold text-lg leading-tight">
          Daily Target
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
          Your AI Coach adjusts difficulty based on this goal.
        </p>

        <div className="flex justify-between items-end mt-6 mb-2">
          <span className="text-[9px] tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-bold font-mono pb-1">
            DAILY QUESTION TARGET
          </span>
          <span className="text-5xl font-extrabold text-blue-500 dark:text-blue-400 font-display leading-none">
            {dailyTarget}
          </span>
        </div>

        <input 
          type="range" 
          min="1" 
          max="20" 
          value={dailyTarget} 
          onChange={(e) => setDailyTarget(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
        />

        <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-bold mt-2">
          <span>1 Q</span>
          <span>20 Q</span>
        </div>
      </section>

      {/* Preferences Card */}
      <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
        <h2 className="text-zinc-900 dark:text-white font-bold text-lg leading-tight">
          Preferences
        </h2>

        {/* Appearance Row */}
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-900 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" /> : <Sun className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Appearance
            </span>
          </div>
          
          <div className="flex bg-zinc-200/60 dark:bg-zinc-950 border border-zinc-300/40 dark:border-zinc-900 rounded-xl p-1 gap-1 text-[11px] font-bold">
            <button 
              type="button"
              onClick={() => setIsDark(false)}
              className={`px-3.5 py-1.5 rounded-lg transition-all select-none cursor-pointer ${!isDark ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              Light
            </button>
            <button 
              type="button"
              onClick={() => setIsDark(true)}
              className={`px-3.5 py-1.5 rounded-lg transition-all select-none cursor-pointer ${isDark ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Daily Reminder Row */}
        <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-900 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Daily Reminder
            </span>
          </div>

          <button 
            type="button"
            onClick={() => setReminderEnabled(!reminderEnabled)}
            className={`w-11 h-6 rounded-full transition-colors flex items-center p-1 cursor-pointer ${reminderEnabled ? 'bg-blue-600 justify-end' : 'bg-zinc-300 dark:bg-zinc-800 justify-start'}`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-sm transition-all" />
          </button>
        </div>
      </section>

      {/* Support Card */}
      <section className="glass-card rounded-[24px] p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h2 className="text-zinc-900 dark:text-white font-bold text-lg leading-tight">
          Support
        </h2>

        <div className="space-y-1">
          <div 
            onClick={() => setActiveSubView('help')}
            className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
              Help Center
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
          </div>

          <div 
            onClick={() => setActiveSubView('terms')}
            className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
              Terms of Service
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
          </div>

          <div 
            onClick={() => setActiveSubView('privacy')}
            className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors group"
          >
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
              Privacy Policy
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
          </div>
        </div>
      </section>

      {/* Danger Zone Card */}
      <section className="glass-card rounded-[24px] p-6 border-rose-500/25 bg-rose-500/5">
        <h2 className="text-rose-500 dark:text-rose-450 font-bold text-lg leading-tight">
          Danger Zone
        </h2>
        <p className="text-zinc-550 dark:text-zinc-400 text-xs mt-1">
          Logging out will pause all active AI coaching sessions.
        </p>

        <button 
          type="button"
          onClick={handleLogout}
          className="w-full bg-[#fca5a5] hover:bg-red-400 text-zinc-950 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs mt-5 shadow-md shadow-red-500/5 select-none cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          Logout
        </button>
      </section>
    </div>
  )
}
