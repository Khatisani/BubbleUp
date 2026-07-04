import React, { useState } from 'react';
import { useBubbleStore } from './hooks/useBubbleStore';
import FocusCard from './components/FocusCard';
import RoutineBacklog from './components/RoutineBacklog';

export default function App() {
  const { tasks, stats, completeTask, skipTask, addTask, deleteTask } = useBubbleStore();
  
  // Temporary handler until we drop in the BubbleBreak component
  const handleSpawnBubble = (taskText) => {
    console.log("Spawning bubble particle for:", taskText);
  };

  return (
    <div className="min-h-screen bg-bubble-cream text-bubble-dark flex flex-col items-center justify-center p-6 gap-6 relative overflow-hidden">
      {/* 1. Main Focus Target Dashboard */}
      <FocusCard 
        tasks={tasks}
        stats={stats}
        onComplete={completeTask}
        onSkip={skipTask}
        onSpawnBubble={handleSpawnBubble}
      />

      {/* 2. Queue Backlog Routine System */}
      <RoutineBacklog 
        tasks={tasks}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}