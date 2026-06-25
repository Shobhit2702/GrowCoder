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
  Settings
} from 'lucide-react'

import DashboardTab from '../components/DashboardTab'
import AnalysisTab from '../components/AnalysisTab'
import CoachTab from '../components/CoachTab'
import AchievementsTab from '../components/AchievementsTab'
import SettingsTab from '../components/SettingsTab'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Theme state switcher
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light')
    }
    return true
  })

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
    <div className="relative min-h-screen bg-transparent text-zinc-800 dark:text-zinc-100 pb-28 md:pb-12 grid-bg">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-500/5 dark:bg-purple-950/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-900 bg-white/75 dark:bg-[#030712]/75 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center shadow-lg shadow-brand-indigo/25">
              <Terminal className="w-5 h-5 text-white" />
            </Link>
            <span className="font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              GrowCode
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg ${activeTab === 'dashboard' ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900/60 font-semibold' : ''}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('analysis')} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg ${activeTab === 'analysis' ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900/60 font-semibold' : ''}`}
            >
              Analysis
            </button>
            <button 
              onClick={() => setActiveTab('coach')} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg ${activeTab === 'coach' ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900/60 font-semibold' : ''}`}
            >
              AI Coach
            </button>
            <button 
              onClick={() => setActiveTab('achievements')} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg ${activeTab === 'achievements' ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900/60 font-semibold' : ''}`}
            >
              Achievements
            </button>
          </nav>

          {/* User Session Area */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-950/60"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={handleLogout}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-950/60"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <div 
              className="w-9 h-9 rounded-full ring-2 ring-brand-indigo/35 overflow-hidden bg-zinc-800 flex items-center justify-center cursor-pointer shadow-sm"
              onClick={() => setActiveTab('settings')}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Coder Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-4xl mx-auto px-4 pt-8 relative z-10">
        {renderTabContent()}
      </main>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#030712]/95 border-t border-zinc-200 dark:border-zinc-900/90 backdrop-blur-md md:hidden transition-colors">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between relative">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-brand-indigo scale-105' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[9px] font-semibold tracking-tight">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'analysis' ? 'text-brand-indigo scale-105' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[9px] font-semibold tracking-tight">Analysis</span>
          </button>

          {/* Special Center Floating / Glowing Coach Button */}
          <div className="relative -top-5 flex flex-col items-center">
            <button 
              onClick={() => setActiveTab('coach')}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${activeTab === 'coach' ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/50 border border-indigo-400/30' : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <span className="text-[9px] font-semibold tracking-tight text-zinc-400 dark:text-zinc-500 mt-1">Coach</span>
          </div>

          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'achievements' ? 'text-brand-indigo scale-105' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[9px] font-semibold tracking-tight">Achievements</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-brand-indigo scale-105' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[9px] font-semibold tracking-tight">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
