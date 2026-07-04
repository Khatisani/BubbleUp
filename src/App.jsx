import React, { useState } from 'react';
import { useBubbleStore } from './hooks/useBubbleStore';
import FocusCard from './components/FocusCard';
import { Eye } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [isBreakOpen, setIsBreakOpen] = useState(false);
  const [isBacklogExpanded, setIsBacklogExpanded] = useState(false);
  
  const { tasks, completeTask, skipTask } = useBubbleStore();

  return (
    <div className="min-h-screen bg-[#FFF4F5] text-[#4A3538] flex flex-col items-center justify-between p-4 md:p-8 font-sans antialiased selection:bg-[#FFE5E9]">
      
      {/* Top Margin Spacer matching layout structure */}
      <div className="w-full max-w-3xl flex flex-col items-center mt-4">
        <p className="text-sm font-light text-[#4A3538]/50 tracking-wide mb-6">
          Right now, just this.
        </p>

        {/* Core Main View Container */}
        <div className="w-full space-y-4">
          {activeTab === 'today' ? (
            <FocusCard 
              currentTask={tasks[0] || { text: "Rest — you earned it 🌸" }} 
              onDone={completeTask} 
              onSkip={skipTask} 
            />
          ) : (
            <div className="min-h-[280px] bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-[0_20px_50px_rgba(255,163,177,0.15)] flex items-center justify-center">
              <p className="text-[#4A3538]/60 italic">Graph engine module slot...</p>
            </div>
          )}

          {/* Sub collapsible Routines Card matching layout view */}
          <div className="bg-white/40 border border-white/60 rounded-2xl px-6 py-4 flex flex-col shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2 text-sm text-[#4A3538]/70">
                <span className="text-base">📋</span>
                <span className="font-light">My Routines</span>
              </div>
              <button 
                onClick={() => setIsBacklogExpanded(!isBacklogExpanded)}
                className="text-xs font-light text-[#4A3538]/40 hover:text-[#FF6B8B] tracking-wider transition-colors"
              >
                {isBacklogExpanded ? 'hide' : 'peek'}
              </button>
            </div>

            {isBacklogExpanded && (
              <div className="mt-4 pt-4 border-t border-[#4A3538]/5 text-sm space-y-2 animate-fadeIn">
                {tasks.slice(1).length > 0 ? (
                  tasks.slice(1).map((t, i) => (
                    <div key={t.id} className="flex justify-between items-center py-1 opacity-60">
                      <span>{t.text}</span>
                      <span className="text-xs text-[#4A3538]/30">#{i + 1} in queue</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#4A3538]/40 italic py-2">No other tasks in queue.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar matching layout capsule element */}
      <footer className="w-full max-w-md flex justify-center mb-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-full px-2 py-1.5 flex space-x-1 shadow-[0_10px_30px_rgba(255,163,177,0.1)]">
          <button 
            onClick={() => setActiveTab('today')}
            className={`px-6 py-2 rounded-full font-medium text-xs tracking-wide transition-all flex items-center space-x-1.5 ${activeTab === 'today' ? 'bg-[#FF6B8B] text-white shadow-sm' : 'text-[#4A3538]/60 hover:text-[#4A3538]'}`}
          >
            <span>🌸</span> <span>Today</span>
          </button>
          <button 
            onClick={() => setIsBreakOpen(true)}
            className="px-6 py-2 rounded-full font-medium text-xs tracking-wide text-[#4A3538]/60 hover:text-[#4A3538] transition-all flex items-center space-x-1.5"
          >
            <span>🫧</span> <span>Bubbles</span>
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-2 rounded-full font-medium text-xs tracking-wide transition-all flex items-center space-x-1.5 ${activeTab === 'progress' ? 'bg-[#FF6B8B] text-white shadow-sm' : 'text-[#4A3538]/60 hover:text-[#4A3538]'}`}
          >
            <span>📊</span> <span>Progress</span>
          </button>
        </div>
      </footer>

      {/* Floating Gradient Orb Launcher in bottom right corner */}
      <button 
        onClick={() => setIsBreakOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-[0_15px_30px_rgba(255,107,139,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center border-2 border-white/60 bg-gradient-to-tr from-[#FFA3B1] via-[#FFD3DA] to-[#FFF0F2] group"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="absolute bottom-4 right-4 text-xs opacity-40 group-hover:scale-110 transition-transform">🫧</span>
          <span className="absolute top-4 left-4 text-sm opacity-60 group-hover:scale-110 transition-transform">🫧</span>
        </div>
      </button>

      {/* Placeholder context for break layout */}
      {isBreakOpen && (
        <div onClick={() => setIsBreakOpen(false)} className="fixed inset-0 bg-[#FFF4F5]/95 z-50 flex items-center justify-center cursor-pointer">
          <p className="text-xl font-light text-[#FF6B8B] animate-pulse">Pop Engine Active — Click anywhere to exit</p>
        </div>
      )}

    </div>
  );
}