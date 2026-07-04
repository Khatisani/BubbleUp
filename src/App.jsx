import React, { useState } from 'react';
import { useBubbleStore } from './hooks/useBubbleStore';
import FocusCard from './components/FocusCard';

export default function App() {
  const { tasks, stats, completeTask, skipTask } = useBubbleStore();
  
  // Temporary handler until we drop in the BubbleBreak component
  const handleSpawnBubble = (taskText) => {
    console.log("Spawning bubble particle for:", taskText);
  };

  return (
    <div className="min-h-screen bg-bubble-cream text-bubble-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* App Shell Workspace */}
      <FocusCard 
        tasks={tasks}
        stats={stats}
        onComplete={completeTask}
        onSkip={skipTask}
        onSpawnBubble={handleSpawnBubble}
      />
    </div>
  );
}