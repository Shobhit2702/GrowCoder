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
  Brain,
  User
} from 'lucide-react'

import DashboardTab from '../components/DashboardTab'
import AnalysisTab from '../components/AnalysisTab'
import CoachTab from '../components/CoachTab'
import AchievementsTab from '../components/AchievementsTab'
import SettingsTab from '../components/SettingsTab'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isDark, setIsDark] = useState(true)
  
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

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

  const fetchDashboard = async () => {
    const username = localStorage.getItem('leetcode_username');
    if (!username) {
      navigate('/');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`http://localhost:5001/api/v1/dashboard/${username}`);
      const result = await response.json();

      if (!response.ok || result.status === 'fail' || result.status === 'error') {
        throw new Error(result.message || 'Failed to retrieve dashboard data');
      }

      setDashboardData(result.data);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [navigate])

  const onStartDrill = async (topic) => {
    const username = localStorage.getItem('leetcode_username');
    if (!username) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/dashboard/${username}/drill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });
      const result = await response.json();
      if (!response.ok || result.status === 'fail') {
        throw new Error(result.message || 'Failed to start topic drill');
      }
      setDashboardData(result.data);
      setActiveTab('coach');
    } catch (err) {
      alert(`Drill selection error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('leetcode_username');
    navigate('/')
  }

  // Main selector to render active tab content
  const renderTabContent = () => {
    if (!dashboardData) return null;
    
    switch(activeTab) {
      case 'analysis':
        return <AnalysisTab setActiveTab={setActiveTab} data={dashboardData} onStartDrill={onStartDrill} />
      case 'coach':
        return <CoachTab data={dashboardData} />
      case 'achievements':
        return <AchievementsTab data={dashboardData} />
      case 'settings':
        return <SettingsTab isDark={isDark} setIsDark={setIsDark} handleLogout={handleLogout} onSettingsChanged={fetchDashboard} data={dashboardData} />
      case 'dashboard':
      default:
        return <DashboardTab isDark={isDark} data={dashboardData} />
    }
  }

  const isAnalysisTab = activeTab === 'analysis'
  const isCoachTab = activeTab === 'coach'
  const isOperatorSidebar = isAnalysisTab || isCoachTab

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06080f] text-zinc-150 flex flex-col justify-center items-center font-mono text-sm leading-relaxed p-6">
        <div className="w-12 h-12 rounded-lg border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
        <div className="tracking-widest animate-pulse font-bold text-[11px] text-zinc-400">CONNECTING TO GROWCODE CLUSTER...</div>
        <div className="text-[9px] text-zinc-650 mt-2 select-none tracking-widest font-semibold uppercase">SECURE_CHANNEL // VERIFY_IDENTITY</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-[#06080f] text-zinc-150 flex flex-col justify-center items-center font-mono text-sm leading-relaxed p-6">
        <div className="text-rose-500 text-3xl mb-4 font-black">💥 LINK FAILURE</div>
        <div className="max-w-md text-center bg-rose-950/10 border border-rose-900/30 p-6 rounded-xl space-y-4 shadow-2xl">
          <p className="text-xs text-zinc-400 font-mono tracking-wide leading-relaxed">{errorMsg}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg font-mono text-xs cursor-pointer shadow-md active:scale-95 transition-all select-none uppercase tracking-wide border border-blue-400/25"
          >
            [ RETRY PROFILE SYNC ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${isDark ? 'dark bg-[#06080f] text-zinc-100' : 'light bg-zinc-50 text-zinc-900'}`}>
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* LEFT SIDEBAR (Desktop only) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-[#171c26] bg-white dark:bg-[#080a10] shrink-0 justify-between transition-colors z-20 relative">
        
        {/* Upper Sidebar Navigation links */}
        <div className="flex flex-col">
          {/* Logo & Branding */}
          <div className="h-16 px-6 border-b border-zinc-200 dark:border-[#171c26] flex items-center justify-between">
            <Link to="/" className="font-display font-black text-xl tracking-tight text-[#3b82f6] dark:text-[#3b82f6] flex items-center gap-1.5 uppercase">
              GROWCODE
            </Link>
          </div>

          {/* Sidebar header profile box */}
          {isOperatorSidebar ? (
            <div className="p-4 border-b border-zinc-200 dark:border-[#171c26] flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6] shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[12px] font-bold text-zinc-900 dark:text-white tracking-wider leading-none">OPERATOR_01</div>
                <div className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold tracking-widest mt-1.5 flex items-center gap-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  SYSTEM.STATUS: LIVE
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-zinc-200 dark:border-[#171c26] flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3b82f6]">
                <Brain className="w-5.5 h-5.5" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[12px] font-bold text-zinc-900 dark:text-white tracking-wider leading-none">CYBER-HUD</div>
                <div className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold tracking-widest mt-1.5 flex items-center gap-1 select-none">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  SYSTEM CORE ONLINE
                </div>
              </div>
            </div>
          )}

          {/* Navigation links list */}
          <nav className="p-3 space-y-1 font-mono text-[12.5px] text-zinc-500 dark:text-zinc-400">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/5 dark:from-[#121824] dark:to-[#172030] text-[#3b82f6] dark:text-[#3b82f6] border-r-4 border-[#3b82f6] font-bold' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#3b82f6]" />
              Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('analysis')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                activeTab === 'analysis' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/5 dark:from-[#121824] dark:to-[#172030] text-[#3b82f6] dark:text-[#3b82f6] border-r-4 border-[#3b82f6] font-bold' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
              Analysis
            </button>

            <button 
              onClick={() => setActiveTab('coach')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                activeTab === 'coach' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/5 dark:from-[#121824] dark:to-[#172030] text-[#3b82f6] dark:text-[#3b82f6] border-r-4 border-[#3b82f6] font-bold' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
              AI Coach
            </button>

            <button 
              onClick={() => setActiveTab('achievements')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                activeTab === 'achievements' 
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/5 dark:from-[#121824] dark:to-[#172030] text-[#3b82f6] dark:text-[#3b82f6] border-r-4 border-[#3b82f6] font-bold' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#3b82f6]" />
              Achievements
            </button>

            {!isOperatorSidebar && (
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${
                  activeTab === 'settings' 
                    ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/5 dark:from-[#121824] dark:to-[#172030] text-[#3b82f6] dark:text-[#3b82f6] border-r-4 border-[#3b82f6] font-bold' 
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Settings className="w-4 h-4 text-[#3b82f6]" />
                Settings
              </button>
            )}
          </nav>
        </div>

        {/* Lower Sidebar Area: Action buttons and logs */}
        <div className="p-4 space-y-3 shrink-0">
          {isOperatorSidebar ? (
            <>
              <button 
                className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[11px] py-3.5 rounded-lg transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                onClick={() => alert('Initiating new training sprint...')}
              >
                Initiate Sprint
              </button>

              <div className="flex justify-center gap-6 py-2 font-mono text-[10px] text-zinc-500 dark:text-zinc-650 tracking-wider">
                <a href="#docs" className="hover:text-zinc-800 dark:hover:text-zinc-400 transition-colors">DOCS</a>
                <a href="#support" className="hover:text-zinc-800 dark:hover:text-zinc-400 transition-colors">SUPPORT</a>
              </div>
            </>
          ) : (
            <>
              <button 
                className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[11px] py-3.5 rounded-lg transition-all active:scale-[0.98] shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                onClick={() => alert('Deploying new node to the cluster...')}
              >
                <Rocket className="w-4 h-4" />
                Deploy New Node
              </button>

              <button 
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/40 font-mono text-[11px] text-zinc-500 dark:text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors text-left cursor-pointer"
                onClick={() => setActiveTab('dashboard')}
              >
                <Terminal className="w-3.5 h-3.5" />
                System Logs
              </button>
            </>
          )}
        </div>

      </aside>

      {/* RIGHT CONTAINER: Top Navbar + Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* TOP HEADER / NAVBAR */}
        <header className="h-16 border-b border-zinc-200 dark:border-[#171c26] bg-white/80 dark:bg-[#080a10]/85 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-colors">
          
          {/* Left: Session Node Path Display */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11.5px] font-bold tracking-wider text-[#3b82f6] uppercase">
              {activeTab === 'achievements' ? 'ACHIEVEMENT_ENGINE_v4.2' : activeTab === 'coach' ? 'SESSION_NODE://AI_COACH_V4' : `SESSION_NODE://${activeTab.toUpperCase()}_V4`}
            </span>
            
            {/* LIVE FEED badge pill */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>LIVE_FEED</span>
            </div>
          </div>

          {/* Center: Search Box */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-md mx-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <input 
                type="text" 
                placeholder="CMD_FIND..." 
                disabled
                className="w-full bg-zinc-100 dark:bg-[#0c0e14]/65 border border-zinc-200 dark:border-[#171c26]/80 rounded-lg py-1.5 pl-9 pr-3 text-[10px] font-mono placeholder-zinc-450 dark:placeholder-zinc-600 text-zinc-800 dark:text-zinc-300 focus:outline-none select-none cursor-not-allowed opacity-80"
              />
            </div>
          </div>

          {/* Right: Working Dark/Light Mode, Bell notification & Settings */}
          <div className="flex items-center gap-3">
            
            {/* Top Navbar Dark/Light Theme Button Switcher */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#0d1017] border border-zinc-200 dark:border-[#171c26] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer shadow-sm"
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            <button className="relative w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#0d1017] border border-zinc-200 dark:border-[#171c26] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer shadow-sm">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3b82f6] rounded-full" />
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#0d1017] border border-zinc-200 dark:border-[#171c26] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer shadow-sm"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE VIEWPORT */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 text-left transition-colors duration-300 ${isDark ? 'bg-[#06080f]' : 'bg-zinc-50'}`}>
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
