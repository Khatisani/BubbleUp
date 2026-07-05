import React, { useState } from 'react';
import { useBubbleStore, getLocalDateString } from './hooks/useBubbleStore';
import FocusCard from './components/FocusCard';
import TaskManager from './components/TaskManager';
import ProgressHistory from './components/ProgressHistory';
import BubbleBreak from './components/BubbleBreak';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [isBreakOpen, setIsBreakOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const { 
    selectedDate, 
    setSelectedDate, 
    getTasksForDate, 
    completeTask, 
    skipTask, 
    addTask, 
    editTask,
    deleteTask, 
    moveTask,
    historyLog,
    incrementPopped
  } = useBubbleStore();

  const todaysTasks = getTasksForDate(getLocalDateString());

  let mainContent;
  if (activeTab === 'today') {
    mainContent = (
      <>
        <FocusCard 
          currentTask={todaysTasks[0]} 
          onDone={() => completeTask(getLocalDateString())} 
          onSkip={() => skipTask(getLocalDateString())} 
        />

        {/* Collapsible Sub-card wrapper */}
        <div className="w-full bg-white/40 border border-white/60 rounded-2xl px-6 py-4 flex flex-col shadow-sm transition-all duration-300">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-2 text-sm text-[#4A3538]/70">
              <span className="font-light">My Tasks</span>
            </div>
            <button 
              onClick={() => setIsPanelExpanded(!isPanelExpanded)}
              className="text-xs font-light text-[#4A3538]/40 hover:text-[#FF6B8B] tracking-wider transition-colors"
            >
              {isPanelExpanded ? 'hide' : 'show'}
            </button>
          </div>

          {isPanelExpanded && (
            <div className="mt-6 pt-2 border-t border-[#4A3538]/5 w-full flex justify-center">
              <TaskManager 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                getTasks={getTasksForDate}
                onAddTask={addTask}
                onEditTask={editTask}
                onDeleteTask={deleteTask}
                onMoveTask={moveTask}
              />
            </div>
          )}
        </div>
      </>
    );
  } else {
    mainContent = (
      <ProgressHistory 
        historyLog={historyLog} 
        getTasksForDate={getTasksForDate} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4F5] text-[#4A3538] flex flex-col items-center justify-start pt-6 pb-28 px-4 md:px-8 font-sans antialiased space-y-8">
      
      {/* Top Header Layout */}
      <header className="w-full max-w-3xl flex justify-between items-start px-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE5E9] border border-[#FFA3B1]/30 flex items-center justify-center shadow-sm">
            <span className="text-lg text-[#FF6B8B]">🫧</span>
          </div>
          <div>
            <h1 className="text-xl font-serif font-semibold text-[#3D282B] tracking-tight leading-tight">
              BubbleUp
            </h1>
            <p className="text-xs font-light text-[#4A3538]/60 mt-0.5">
              Hey Khatisani
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-white/50 border border-[#FFE0E4] text-[10px] font-light text-[#FF94A5] tracking-wider flex items-center space-x-1 shadow-sm">
          <span>☀️</span>
          <span>Remember who you are</span>
        </div>
      </header>

      {/* Main Container Workspace */}
      <div className="w-full max-w-3xl flex flex-col items-center space-y-4">
        <p className="text-xs font-light text-[#4A3538]/40 tracking-wide mb-2">
          Right now, just this.
        </p>

        {mainContent}
      </div>

      {/* Nav Capsule component */}
      <footer className="fixed bottom-6 inset-x-0 mx-auto w-full max-w-md flex justify-center z-10 px-4">
        <div className="bg-white/70 backdrop-blur-lg border border-white/80 rounded-full px-2 py-1.5 flex space-x-1 shadow-[0_10px_30px_rgba(255,163,177,0.1)]">
          <button 
            onClick={() => setActiveTab('today')}
            className={`px-6 py-2 rounded-full font-medium text-xs tracking-wide transition-all ${activeTab === 'today' ? 'bg-[#FF6B8B] text-white shadow-sm' : 'text-[#4A3538]/60'}`}
          >
            🌸 Today
          </button>
          <button 
            onClick={() => setIsBreakOpen(true)}
            className="px-6 py-2 rounded-full font-medium text-xs tracking-wide text-[#4A3538]/60 hover:text-[#4A3538]"
          >
            🫧 Bubbles
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-2 rounded-full font-medium text-xs tracking-wide transition-all ${activeTab === 'progress' ? 'bg-[#FF6B8B] text-white shadow-sm' : 'text-[#4A3538]/60'}`}
          >
            Progress
          </button>
        </div>
      </footer>

      {/* Floating Launcher Bubble */}
      {/* <button 
        onClick={() => setIsBreakOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg border-2 border-white/60 bg-gradient-to-tr from-[#FFA3B1] via-[#FFD3DA] to-[#FFF0F2] flex items-center justify-center z-20"
      >
        <span className="text-xl">🫧</span>
      </button> */}

      {/* Cleaned Intermission Overlay Integration */}
      <BubbleBreak 
        isOpen={isBreakOpen} 
        onClose={() => setIsBreakOpen(false)} 
        onPop={incrementPopped} 
      />

    </div>
  );
}