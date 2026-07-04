import React from 'react';
import { CheckCircle, SkipForward, Flame, Sparkles } from 'lucide-react';

export default function FocusCard({ tasks, stats, onComplete, onSkip, onSpawnBubble }) {
  const currentTask = tasks[0];

  const handleComplete = () => {
    // Trigger the bubble floating animation particle effect before completing
    if (currentTask) {
      onSpawnBubble(currentTask.text);
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-bubble-blush/60 text-center max-w-md w-full relative overflow-hidden">
      {/* Top Stats Banner */}
      <div className="flex justify-between items-center mb-8 border-b border-bubble-blush/30 pb-4">
        <div className="flex items-center space-x-2 text-bubble-dark/80">
          <Flame className="w-5 h-5 text-bubble-magenta animate-pulse" />
          <span className="text-sm font-medium">Done: {stats.completed}</span>
        </div>
        <div className="flex items-center space-x-2 text-bubble-dark/80">
          <Sparkles className="w-4 h-4 text-bubble-rose" />
          <span className="text-sm font-medium">Popped: {stats.popped}</span>
        </div>
      </div>

      {/* Main Focus Target */}
      <div className="my-10 space-y-4">
        <span className="text-xs font-bold tracking-widest text-bubble-magenta/70 uppercase bg-bubble-blush/40 px-3 py-1 rounded-full">
          Current Focus
        </span>
        <h2 className="text-2xl font-semibold text-bubble-dark min-h-[80px] flex items-center justify-center px-4 leading-relaxed">
          {currentTask ? currentTask.text : "All clear! Time to recharge. ✨"}
        </h2>
      </div>

      {/* Primary Control Group */}
      <div className="flex flex-col space-y-3 mt-6">
        <button
          onClick={handleComplete}
          disabled={!currentTask}
          className="w-full py-4 bg-bubble-magenta hover:bg-bubble-magenta/90 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 shadow-sm shadow-bubble-magenta/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Mark as Done</span>
        </button>

        <button
          onClick={onSkip}
          disabled={tasks.length <= 1}
          className="w-full py-3 bg-bubble-blush/40 hover:bg-bubble-blush/60 disabled:opacity-40 text-bubble-dark font-medium rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all cursor-pointer text-sm"
        >
          <SkipForward className="w-4 h-4" />
          <span>Skip for Now</span>
        </button>
      </div>
    </div>
  );
}