import { useState, useEffect } from 'react';

// Get a standard YYYY-MM-DD string for local mapping
export const getLocalDateString = (date = new Date()) => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().split('T')[0];
};

const INITIAL_TASKS = {
  // Mock data mapping to the Friday view in the screenshot
  "2026-07-03": [
    { id: 1, text: "Take three slow breaths" },
    { id: 2, text: "Open course files" }
  ]
};

export function useBubbleStore() {
  const [taskMap, setTaskMap] = useState(() => {
    const saved = localStorage.getItem('bubble_tasks_map');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('bubble_stats');
    return saved ? JSON.parse(saved) : { completed: 0, popped: 0 };
  });

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());

  useEffect(() => {
    localStorage.setItem('bubble_tasks_map', JSON.stringify(taskMap));
  }, [taskMap]);

  useEffect(() => {
    localStorage.setItem('bubble_stats', JSON.stringify(stats));
  }, [stats]);

  // Gets tasks specifically for the dashboard (Today's active queue)
  const getTasksForDate = (dateStr) => taskMap[dateStr] || [];

  const completeTask = (dateStr) => {
    const currentTasks = taskMap[dateStr] || [];
    if (currentTasks.length > 0) {
      setTaskMap(prev => ({
        ...prev,
        [dateStr]: prev[dateStr].slice(1)
      }));
      setStats(prev => ({ ...prev, completed: prev.completed + 1 }));
    }
  };

  const skipTask = (dateStr) => {
    const currentTasks = taskMap[dateStr] || [];
    if (currentTasks.length > 1) {
      setTaskMap(prev => {
        const [current, ...rest] = prev[dateStr];
        return {
          ...prev,
          [dateStr]: [...rest, current]
        };
      });
    }
  };

  const addTask = (dateStr, text) => {
    setTaskMap(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { id: Date.now(), text }]
    }));
  };

  const deleteTask = (dateStr, id) => {
    setTaskMap(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || []).filter(t => t.id !== id)
    }));
  };

  const incrementPopped = () => {
    setStats(prev => ({ ...prev, popped: prev.popped + 1 }));
  };

  return { 
    selectedDate, 
    setSelectedDate, 
    getTasksForDate, 
    completeTask, 
    skipTask, 
    addTask, 
    deleteTask, 
    incrementPopped,
    stats
  };
}