import React from 'react';
import { useBubbleStore } from './hooks/useBubbleStore';

export default function App() {
  const { tasks, completeTask, skipTask } = useBubbleStore();

  return (
    <div className="min-h-screen bg-bubble-cream text-bubble-dark flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-bubble-blush text-center max-w-sm w-full space-y-6">
        <span className="text-xs font-semibold tracking-wider text-bubble-magenta/70 uppercase bg-bubble-blush/50 px-3 py-1 rounded-full">
          BubbleUp Hook Test 🫧
        </span>
        
        <h2 className="text-xl font-semibold text-bubble-dark">
          {tasks.length > 0 ? tasks[0].text : "All tasks cleared! ✨"}
        </h2>
        
        <div className="flex flex-col space-y-2">
          <button 
            onClick={completeTask}
            className="w-full py-3 bg-bubble-magenta text-white font-semibold rounded-xl active:scale-95 transition"
          >
            Test Done
          </button>
          <button 
            onClick={skipTask}
            className="w-full py-2 bg-bubble-blush/50 text-bubble-dark text-sm rounded-xl active:scale-95 transition"
          >
            Test Skip
          </button>
        </div>
      </div>
    </div>
  );
}