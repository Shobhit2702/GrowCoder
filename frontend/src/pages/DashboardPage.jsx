import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Terminal, 
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Trophy,
  Settings,
  Bell,
  Search,
  Rocket,
  Brain
} from 'lucide-react'

import DashboardTab from '../components/DashboardTab'
import AnalysisTab from '../components/AnalysisTab'
import CoachTab from '../components/CoachTab'
import AchievementsTab from '../components/AchievementsTab'
import SettingsTab from '../components/SettingsTab'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Theme state switcher - default to true to match dark mode mockup
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const handleLogout = () => {
    navigate('/')
  }

  // Main selector to render active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'analysis':
        return <AnalysisTab setActiveTab={setActiveTab} />
      case 'coach':
        return <CoachTab />
      case 'achievements':
        return <AchievementsTab />
      case 'settings':
        return <SettingsTab isDark={isDark} setIsDark={setIsDark} handleLogout={handleLogout} />
      case 'dashboard':
      default:
        return <DashboardTab isDark={isDark} />
    }
  }

  return (
    <div className="dark min-h-screen bg-[#06080f] text-zinc-100 flex flex-col font-sans">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* TOP HEADER / NAVBAR */}
      <header className="h-16 border-b border-[#171c26] bg-[#080a10]/85 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Left: Logo & version */}
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1.5">
            <span className="text-[#3b82f6]">GrowCode</span>
          </Link>
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 mt-0.5">v4.2.0-stable</span>
        </div>

        {/* Center: Search Box */}
        <div className="hidden md:flex items-center bg-[#0d1017] border border-[#171c26] rounded-lg px-3 py-1.5 w-80 justify-between">
          <div className="flex items-center gap-2 text-zinc-500">
            <Search className="w-3.5 h-3.5" />
            <span className="text-[10.5px] font-mono tracking-wide">CMD+K TO SEARCH</span>
          </div>
          <span className="text-[8px] font-mono text-zinc-600 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900 select-none">/SEARCH</span>
        </div>

        {/* Right: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-4">
          <button className="relative w-8 h-8 rounded-lg bg-[#0d1017] border border-[#171c26] flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3b82f6] rounded-full" />
          </button>
          
          <div 
            className="w-8 h-8 rounded-full overflow-hidden border border-[#171c26] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setActiveTab('settings')}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Coder Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* VIEWPORT SPLIT CONTAINER */}
      <div className="flex flex-1 relative z-10 overflow-hidden">
        
        {/* LEFT SIDEBAR (Desktop only) */}
        <aside className="hidden md:flex flex-col w-64 border-r border-[#171c26] bg-[#080a10] shrink-0 justify-between">
          
          {/* Upper Sidebar Navigation links */}
          <div className="flex flex-col">
            {/* Cyber-HUD Logo Header Box */}
            <div className="p-4 border-b border-[#171c26] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6]">
                <Brain className="w-5.5 h-5.5" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[12px] font-bold text-white tracking-wider leading-none">CYBER-HUD</div>
                <div className="text-[7.5px] text-emerald-400 font-bold tracking-widest mt-1 flex items-center gap-1 select-none">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  SYSTEM CORE ONLINE
                </div>
              </div>
            </div>

            {/* Navigation links list */}
            <nav className="p-3 space-y-1 font-mono text-[12.5px] text-zinc-400">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#121824] text-white border-l-2 border-[#3b82f6] font-semibold' 
                    : 'hover:bg-zinc-900/40 hover:text-zinc-200'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#3b82f6]" />
                Dashboard
              </button>

              <button 
                onClick={() => setActiveTab('analysis')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'analysis' 
                    ? 'bg-[#121824] text-white border-l-2 border-[#3b82f6] font-semibold' 
                    : 'hover:bg-zinc-900/40 hover:text-zinc-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
                Analysis
              </button>

              <button 
                onClick={() => setActiveTab('coach')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'coach' 
                    ? 'bg-[#121824] text-white border-l-2 border-[#3b82f6] font-semibold' 
                    : 'hover:bg-zinc-900/40 hover:text-zinc-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
                AI Coach
              </button>

              <button 
                onClick={() => setActiveTab('achievements')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'achievements' 
                    ? 'bg-[#121824] text-white border-l-2 border-[#3b82f6] font-semibold' 
                    : 'hover:bg-zinc-900/40 hover:text-zinc-200'
                }`}
              >
                <Trophy className="w-4 h-4 text-[#3b82f6]" />
                Achievements
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'settings' 
                    ? 'bg-[#121824] text-white border-l-2 border-[#3b82f6] font-semibold' 
                    : 'hover:bg-zinc-900/40 hover:text-zinc-200'
                }`}
              >
                <Settings className="w-4 h-4 text-[#3b82f6]" />
                Settings
              </button>
            </nav>
          </div>

          {/* Lower Sidebar Area: Action buttons and logs */}
          <div className="p-4 space-y-3 shrink-0">
            <button 
              className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[11px] py-3.5 rounded-lg transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              onClick={() => alert('Deploying new node to the cluster...')}
            >
              <Rocket className="w-4 h-4" />
              Deploy New Node
            </button>

            <button 
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg hover:bg-zinc-900/40 font-mono text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors text-left cursor-pointer"
              onClick={() => setActiveTab('dashboard')}
            >
              <Terminal className="w-3.5 h-3.5" />
              System Logs
            </button>
          </div>

        </aside>

        {/* MAIN SCROLLABLE VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 bg-[#06080f] text-left">
          {renderTabContent()}
        </main>

      </div>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080a10]/95 border-t border-[#171c26]/90 backdrop-blur-md md:hidden transition-colors">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between relative">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-[#3b82f6] font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'analysis' ? 'text-[#3b82f6] font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Analysis</span>
          </button>

          {/* Mobile floating button */}
          <div className="relative -top-5 flex flex-col items-center">
            <button 
              onClick={() => setActiveTab('coach')}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:bg-blue-600 border border-blue-400/20 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <span className={`text-[9px] font-semibold tracking-tight mt-1 ${activeTab === 'coach' ? 'text-[#3b82f6]' : 'text-zinc-500'}`}>Coach</span>
          </div>

          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'achievements' ? 'text-[#3b82f6] font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Achievements</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-[#3b82f6] font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
