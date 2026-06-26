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
    <div className="dark relative min-h-screen bg-[#0b0e14] text-zinc-100 pb-28 md:pb-12">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#171c26]/60 bg-[#0b0e14]/75 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Terminal className="w-5 h-5 text-white" />
            </Link>
            <span className="font-display font-extrabold text-lg tracking-tight text-white animate-pulse">
              GrowCode
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`hover:text-white transition-colors py-2 px-3.5 rounded-lg cursor-pointer ${activeTab === 'dashboard' ? 'text-white bg-zinc-900 font-semibold border border-[#171c26]' : ''}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('analysis')} 
              className={`hover:text-white transition-colors py-2 px-3.5 rounded-lg cursor-pointer ${activeTab === 'analysis' ? 'text-white bg-zinc-900 font-semibold border border-[#171c26]' : ''}`}
            >
              Analysis
            </button>
            <button 
              onClick={() => setActiveTab('coach')} 
              className={`hover:text-white transition-colors py-2 px-3.5 rounded-lg cursor-pointer ${activeTab === 'coach' ? 'text-white bg-zinc-900 font-semibold border border-[#171c26]' : ''}`}
            >
              AI Coach
            </button>
            <button 
              onClick={() => setActiveTab('achievements')} 
              className={`hover:text-white transition-colors py-2 px-3.5 rounded-lg cursor-pointer ${activeTab === 'achievements' ? 'text-white bg-zinc-900 font-semibold border border-[#171c26]' : ''}`}
            >
              Achievements
            </button>
          </nav>

          {/* User Session Area */}
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full overflow-hidden border border-[#171c26] cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
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
      <main className="max-w-6xl mx-auto px-4 pt-8 relative z-10">
        {renderTabContent()}
      </main>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0d14]/95 border-t border-[#171c26]/90 backdrop-blur-md md:hidden transition-colors">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between relative">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-white font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'analysis' ? 'text-white font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Analysis</span>
          </button>

          {/* Special Center Floating / Glowing Coach Button */}
          <div className="relative -top-5 flex flex-col items-center">
            <button 
              onClick={() => setActiveTab('coach')}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:bg-blue-600 border border-blue-400/20 active:scale-95 cursor-pointer`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <span className={`text-[9px] font-semibold tracking-tight mt-1 ${activeTab === 'coach' ? 'text-white' : 'text-zinc-500'}`}>Coach</span>
          </div>

          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'achievements' ? 'text-white font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Achievements</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-white font-semibold scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[9px] tracking-tight">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
