import { useState, useEffect } from 'react'
import { 
  Check, 
  Bookmark, 
  Play, 
  Zap, 
  Clock,
  GitFork
} from 'lucide-react'

export default function CoachTab({ data }) {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sessionSummary, setSessionSummary] = useState(null)
  
  // Extract AI analysis, fallback to default mock structure if missing
  const aiAnalysis = data?.aiAnalysis || {
    eloProjection: 142,
    dailyPlan: {
      topic: 'Dynamic Programming',
      description: 'Master the art of recursive optimization. Focus today on overlapping subproblems and optimal substructure identification in complex string manipulations.',
      targetQuestions: 5,
      estTime: 90
    },
    checklist: [
      { id: 1, text: 'SYSTEM DESIGN: SCALING STORAGE', checked: true },
      { id: 2, text: 'REVIEW SPACED REPETITION CARDS', checked: true },
      { id: 3, text: 'SOLVE 2 DYNAMIC PROGRAMMING PROBLEMS', checked: false },
      { id: 4, text: 'MOCK INTERVIEW: FAANG PRACTICE', checked: false }
    ],
    recommendations: [
      {
        title: 'Word Break II',
        difficulty: 'Hard',
        reason: 'You previously struggled with String-to-List mapping logic. This problem specifically targets your memoization gap in non-linear backtracking.',
        complexity: 'O(2^N) backtracking optimized to O(N^2) via memoization',
        subproblems: 'Overlapping prefixes s[0...i]',
        prereq: 'Recursion, Memoization, DFS, Trie'
      },
      {
        title: 'Edit Distance',
        difficulty: 'Medium',
        reason: 'Mastering this establishes the foundation for DNA sequencing and fuzzy search algorithms—key patterns for upcoming FAANG assessments.',
        complexity: 'O(M * N) space and time complexity',
        subproblems: 'Alignments s1[0...i] vs s2[0...j]',
        prereq: 'Dynamic Programming table matching'
      }
    ]
  };

  // State checklist initialized from data
  const [checklist, setChecklist] = useState(aiAnalysis.checklist)

  // Reset checklist if data changes
  useEffect(() => {
    if (data?.aiAnalysis?.checklist) {
      setChecklist(data.aiAnalysis.checklist)
    }
  }, [data])

  // Active practice timer effect
  useEffect(() => {
    let timerInterval = null;
    if (isSessionActive && !sessionSummary) {
      timerInterval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isSessionActive, sessionSummary]);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const getProblemUrl = (rec) => {
    if (rec.slug) {
      return `https://leetcode.com/problems/${rec.slug}/`;
    }
    if (rec.leetcodeUrl) {
      return rec.leetcodeUrl;
    }
    const slug = rec.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `https://leetcode.com/problems/${slug}/`;
  };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const handleFinishSession = () => {
    const targetQuestions = aiAnalysis.dailyPlan?.targetQuestions || 4;
    const completedCount = checklist.filter(item => item.checked).length;
    const pct = targetQuestions > 0 ? Math.round((completedCount / targetQuestions) * 100) : 0;
    
    const avgSecs = completedCount > 0 ? Math.round(elapsedTime / completedCount) : 0;
    
    setSessionSummary({
      totalTime: formatTime(elapsedTime),
      questionsSolved: completedCount,
      percentage: pct,
      avgTime: completedCount > 0 ? formatTime(avgSecs) : 'N/A'
    });
  };

  const handleCloseSummary = () => {
    setSessionSummary(null);
    setElapsedTime(0);
    setIsSessionActive(false);
  };

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
              {aiAnalysis.dailyPlan.topic}
            </h2>

            <p className="text-zinc-650 dark:text-zinc-400 text-sm sm:text-[14.5px] leading-relaxed font-sans font-medium">
              {aiAnalysis.dailyPlan.description}
            </p>

            {/* Target & Est Metrics block */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-900 pt-5 font-mono max-w-sm">
              <div>
                <span className="block text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Target Questions</span>
                <span className="text-2xl font-black text-[#2563eb] dark:text-[#3b82f6] mt-1 block">
                  {aiAnalysis.dailyPlan.targetQuestions} Total
                </span>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Est. Time</span>
                <span className="text-2xl font-black text-zinc-800 dark:text-white mt-1 block">
                  {aiAnalysis.dailyPlan.estTime} min
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
                    {completedCount}/{checklist.length} COMPLETE
                  </span>
                </div>

                {/* Checklist list */}
                <div className="space-y-3">
                  {checklist.map(item => (
                    <div 
                      key={item.id}
                      className={`flex items-center justify-between border rounded p-3.5 cursor-pointer transition-all select-none ${
                        item.checked 
                          ? 'bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10' 
                          : 'bg-zinc-500/5 border-zinc-200 dark:border-[#171c26] hover:bg-zinc-500/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChecklist(item.id);
                          }}
                          className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                            item.checked 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-zinc-400 dark:border-zinc-700 bg-transparent'
                          }`}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5 stroke-[3.5px]" />}
                        </div>
                        <span 
                          onClick={(e) => {
                            if (item.leetcodeUrl) {
                              e.stopPropagation();
                              window.open(item.leetcodeUrl, '_blank');
                            }
                          }}
                          className={`text-[11.5px] font-mono font-bold leading-tight transition-colors hover:text-blue-500 hover:underline ${
                            item.checked 
                              ? 'text-zinc-450 dark:text-zinc-550 line-through' 
                              : 'text-zinc-800 dark:text-zinc-200'
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <span className={`text-[8.5px] font-mono font-bold transition-colors ${
                        item.checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-500'
                      }`}>
                        {item.checked ? 'STATUS: VERIFIED' : 'STATUS: PENDING'}
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
              {aiAnalysis.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 relative overflow-hidden shadow-2xl flex flex-col justify-between transition-colors h-full min-h-[280px]">
                  
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-500/60" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-500/60" />

                  {/* Scrollable Container */}
                  <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scroll-smooth text-left space-y-3 mb-2 max-h-[175px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9.5px] font-mono font-bold uppercase ${
                        rec.difficulty === 'Hard'
                          ? 'text-orange-600 dark:text-orange-500'
                          : 'text-blue-605 dark:text-blue-450'
                      }`}>
                        DIFFICULTY: {rec.difficulty.toUpperCase()}
                      </span>
                      <Bookmark className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-350 cursor-pointer transition-colors" />
                    </div>

                    <h3 
                      onClick={() => window.open(getProblemUrl(rec), '_blank')}
                      className="font-display font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight uppercase leading-tight hover:text-[#3b82f6] hover:underline cursor-pointer flex items-center gap-1.5"
                      title="Open on LeetCode"
                    >
                      {rec.problemId && <span className="text-[#3b82f6] font-mono">#{rec.problemId}</span>}
                      {rec.title}
                    </h3>

                    {/* AI Reason box */}
                    <div className="bg-[#0f1422]/65 border-l-2 border-blue-500 p-3 rounded-r text-[10.5px] font-mono leading-relaxed text-zinc-650 dark:text-zinc-400">
                      <span className="text-blue-500 font-bold block mb-0.5">AI REASON:</span>
                      "{rec.reason || rec.aiReason || 'Targets your coding DNA gaps.'}"
                    </div>

                    {/* Extra Technical Details to make it scrollable */}
                    <div className="bg-zinc-500/5 dark:bg-[#121824]/20 border border-zinc-200 dark:border-[#171c26] p-2.5 rounded font-mono text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal space-y-1">
                      <div><span className="font-bold text-[#3b82f6]">COMPLEXITY:</span> {rec.complexity}</div>
                      <div><span className="font-bold text-[#3b82f6]">SUBPROBLEMS:</span> {rec.subproblems}</div>
                      <div><span className="font-bold text-[#3b82f6]">PREREQ:</span> {rec.prereq}</div>
                      {rec.estimatedTime && <div><span className="font-bold text-[#3b82f6]">ESTIMATED TIME:</span> {rec.estimatedTime} mins</div>}
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(getProblemUrl(rec), '_blank')}
                    className="w-full bg-transparent hover:bg-purple-500/5 border border-purple-500/30 hover:border-purple-555 text-purple-600 dark:text-purple-400 hover:text-purple-300 font-mono font-bold text-[10px] tracking-wider py-2.5 rounded transition-all cursor-pointer text-center uppercase mt-3 shadow-[0_0_10px_rgba(139,92,246,0.05)] shrink-0"
                  >
                    Solve_Now
                  </button>
                </div>
              ))}
            </div>

            {/* Smart Path Telemetry console footer */}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-[#171c26] flex flex-wrap justify-between items-center gap-4 font-mono text-[9.5px] text-zinc-550 dark:text-zinc-400 leading-none">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-bold">
                <div>SUCCESS RATE / <span className="text-emerald-500">82.1%</span></div>
                <div>GLOBAL RANK / <span className="text-zinc-900 dark:text-zinc-200">Top 2.5%</span></div>
                <div>WEEKLY GAIN / <span className="text-emerald-500">+18.4%</span></div>
              </div>
              <div className="text-zinc-500 text-right font-medium">
                LAST_SYNC: {data?.user?.username ? 'ONLINE' : 'OFFLINE'}
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }

  // STATE B: Active Practice Session (either active timer or summary report)
  const targetQuestions = aiAnalysis.dailyPlan?.targetQuestions || 4
  const remainingCount = Math.max(0, targetQuestions - completedCount)

  return (
    <div className="bg-white dark:bg-[#080b11]/60 border border-zinc-200 dark:border-[#171c26] rounded-lg p-6 min-h-[550px] flex flex-col justify-between relative overflow-hidden transition-colors shadow-2xl">
      
      {/* Neon Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/80" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/80" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#171c26]/60 pb-4 mb-4 select-none">
        <div className="flex items-center gap-2.5">
          {!sessionSummary ? (
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to end this session early without a summary?")) {
                  setIsSessionActive(false);
                  setElapsedTime(0);
                }
              }}
              className="text-xs font-mono font-bold text-[#2563eb] dark:text-[#3b82f6] hover:underline cursor-pointer"
            >
              ← Cancel Session
            </button>
          ) : (
            <span className="text-xs font-mono font-bold text-[#2563eb] dark:text-[#3b82f6]">Practice Complete</span>
          )}
          <span className="text-zinc-350 dark:text-zinc-655 font-mono">|</span>
          <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
            {aiAnalysis.dailyPlan.topic} Drill
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-550 dark:text-zinc-400">
          <span className={`w-1.5 h-1.5 rounded-full ${!sessionSummary ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-purple-500 dark:bg-purple-400'}`} />
          <span>{!sessionSummary ? 'STATUS: IN_PROGRESS' : 'STATUS: ARCHIVED_SUMMARY'}</span>
        </div>
      </div>

      {/* Content Area */}
      {!sessionSummary ? (
        // Active timer and checklist layout
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
          
          {/* Telemetry Console (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-500/5 dark:bg-[#0c0e14]/50 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5 font-mono">
            <div className="space-y-6">
              
              {/* Timer display */}
              <div className="text-center py-6 border-b border-zinc-200 dark:border-[#171c26]/60">
                <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                  <Clock className="w-4 h-4 animate-spin text-[#3b82f6]" style={{ animationDuration: '4s' }} />
                  Elapsed Time
                </div>
                <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-widest leading-none mt-1">
                  {formatTime(elapsedTime)}
                </div>
              </div>

              {/* Question stats grid */}
              <div className="grid grid-cols-3 gap-2.5 text-center text-[10.5px] leading-relaxed">
                <div className="bg-white dark:bg-black/35 border border-zinc-200 dark:border-[#171c26] p-3 rounded">
                  <span className="text-zinc-500 dark:text-zinc-400 block font-bold uppercase text-[9px] tracking-wider mb-1">Target</span>
                  <span className="text-lg font-black text-blue-500 dark:text-[#3b82f6]">{targetQuestions}</span>
                </div>
                <div className="bg-white dark:bg-black/35 border border-zinc-200 dark:border-[#171c26] p-3 rounded">
                  <span className="text-zinc-500 dark:text-zinc-400 block font-bold uppercase text-[9px] tracking-wider mb-1">Completed</span>
                  <span className="text-lg font-black text-emerald-500 dark:text-emerald-450">{completedCount}</span>
                </div>
                <div className="bg-white dark:bg-black/35 border border-zinc-200 dark:border-[#171c26] p-3 rounded">
                  <span className="text-zinc-500 dark:text-zinc-400 block font-bold uppercase text-[9px] tracking-wider mb-1">Remaining</span>
                  <span className="text-lg font-black text-orange-500 dark:text-orange-450">{remainingCount}</span>
                </div>
              </div>

              {/* Session Target Summary Description */}
              <div className="bg-[#0f1422]/35 border-l border-blue-500 p-3 rounded text-[10.5px] text-zinc-650 dark:text-zinc-400 font-sans leading-relaxed">
                Focus on solving recommended problems and checking them off in the list. Hit <strong>Finish Session</strong> to compile your performance analytics.
              </div>
            </div>

            <button 
              onClick={handleFinishSession}
              className="w-full bg-[#ef4444] hover:bg-red-500 text-white font-mono font-bold text-[11px] tracking-wider py-4 px-6 rounded transition-all active:scale-[0.98] mt-6 cursor-pointer uppercase shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
            >
              Finish Session
            </button>
          </div>

          {/* Checklist View (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-zinc-200 dark:border-[#171c26] rounded-lg p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-[#171c26] pb-3 mb-2 font-mono">
                <span className="text-[#3b82f6]">📋</span>
                <span className="text-[10px] font-bold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">ACTIVE_SESSION_CHECKLIST</span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
                {checklist.map(item => (
                  <div 
                    key={item.id}
                    className={`flex items-center justify-between border rounded p-3 cursor-pointer transition-all select-none ${
                      item.checked 
                        ? 'bg-emerald-500/5 border-emerald-500/15 hover:bg-emerald-500/10' 
                        : 'bg-zinc-500/5 border-zinc-200 dark:border-[#171c26] hover:bg-zinc-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChecklist(item.id);
                        }}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                          item.checked 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-zinc-400 dark:border-zinc-700 bg-transparent'
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 stroke-[3.5px]" />}
                      </div>
                      <span 
                        onClick={(e) => {
                          if (item.leetcodeUrl) {
                            e.stopPropagation();
                            window.open(item.leetcodeUrl, '_blank');
                          }
                        }}
                        className={`text-[11px] font-mono font-bold leading-tight transition-colors hover:text-blue-500 hover:underline ${
                          item.checked 
                            ? 'text-zinc-450 dark:text-zinc-555 line-through font-normal' 
                            : 'text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                    <span className={`text-[8px] font-mono font-bold transition-colors ${
                      item.checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-500'
                    }`}>
                      {item.checked ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        // Session Summary Report Layout
        <div className="flex-1 flex flex-col justify-between space-y-6">
          
          <div className="bg-[#0f1422]/65 border border-purple-500/20 p-6 rounded-lg text-center relative overflow-hidden select-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
            
            <span className="text-3xl">🏆</span>
            <h2 className="font-display font-black text-2xl text-zinc-900 dark:text-white tracking-wider uppercase mt-2">
              Session Completed
            </h2>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 font-mono">
              DRILL_RECORD_ID: {Math.random().toString(36).substring(2, 8).toUpperCase()} // DATA_VERIFIED
            </p>
          </div>

          {/* Metrics cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="bg-zinc-500/5 dark:bg-[#0c0e14]/50 border border-zinc-200 dark:border-[#171c26] p-4 rounded-lg text-center">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[9px] font-bold uppercase tracking-wider mb-1.5">Total Time</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">{sessionSummary.totalTime}</span>
            </div>
            <div className="bg-zinc-500/5 dark:bg-[#0c0e14]/50 border border-zinc-200 dark:border-[#171c26] p-4 rounded-lg text-center">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[9px] font-bold uppercase tracking-wider mb-1.5">Solved</span>
              <span className="text-2xl font-black text-emerald-500 dark:text-emerald-450">{sessionSummary.questionsSolved}</span>
            </div>
            <div className="bg-zinc-500/5 dark:bg-[#0c0e14]/50 border border-zinc-200 dark:border-[#171c26] p-4 rounded-lg text-center">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[9px] font-bold uppercase tracking-wider mb-1.5">Completion</span>
              <span className="text-2xl font-black text-blue-500 dark:text-[#3b82f6]">{sessionSummary.percentage}%</span>
            </div>
            <div className="bg-zinc-500/5 dark:bg-[#0c0e14]/50 border border-zinc-200 dark:border-[#171c26] p-4 rounded-lg text-center">
              <span className="text-zinc-500 dark:text-zinc-400 block text-[9px] font-bold uppercase tracking-wider mb-1.5">Avg Time/Q</span>
              <span className="text-2xl font-black text-purple-500 dark:text-purple-400">{sessionSummary.avgTime}</span>
            </div>
          </div>

          {/* Solved checklist overview */}
          <div className="bg-zinc-500/5 dark:bg-black/10 border border-zinc-200 dark:border-[#171c26] rounded-lg p-5">
            <div className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 border-b border-zinc-250 dark:border-zinc-800/60 pb-2.5 mb-3 uppercase tracking-wider">
              Session checklist status
            </div>
            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              {checklist.map(item => (
                <div key={item.id} className="flex items-center justify-between text-xs font-mono">
                  <span className={`flex items-center gap-2 ${item.checked ? 'text-zinc-450 dark:text-zinc-500 line-through' : 'text-zinc-800 dark:text-zinc-300'}`}>
                    <span className={item.checked ? 'text-emerald-500' : 'text-zinc-500'}>{item.checked ? '●' : '○'}</span>
                    {item.text}
                  </span>
                  <span className={item.checked ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {item.checked ? 'COMPLETED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleCloseSummary}
            className="w-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-[11px] tracking-wider py-4 px-6 rounded transition-all active:scale-[0.98] cursor-pointer uppercase"
          >
            [ Return to Coach Dashboard ]
          </button>
        </div>
      )}

    </div>
  )
}
