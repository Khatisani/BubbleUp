import { useState, useEffect } from 'react';

export const getLocalDateString = (date = new Date()) => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().split('T')[0];
};

export function useBubbleStore() {
  const [taskMap, setTaskMap] = useState(() => {
    const saved = localStorage.getItem('bubble_tasks_map');
    return saved ? JSON.parse(saved) : {};
  });

  // New History schema tracking tasks completed per explicit date string
  const [historyLog, setHistoryLog] = useState(() => {
    const saved = localStorage.getItem('bubble_history_log');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());

  useEffect(() => {
    localStorage.setItem('bubble_tasks_map', JSON.stringify(taskMap));
  }, [taskMap]);

  useEffect(() => {
    localStorage.setItem('bubble_history_log', JSON.stringify(historyLog));
  }, [historyLog]);

  const getTasksForDate = (dateStr) => taskMap[dateStr] || [];

  const completeTask = (dateStr) => {
    const currentTasks = taskMap[dateStr] || [];
    if (currentTasks.length > 0) {
      setTaskMap(prev => ({ ...prev, [dateStr]: prev[dateStr].slice(1) }));
      
      // Increment historical data for this specific calendar day
      setHistoryLog(prev => {
        const currentCount = prev[dateStr] || 0;
        return { ...prev, [dateStr]: currentCount + 1 };
      });
    }
  };

  const skipTask = (dateStr) => {
    const currentTasks = taskMap[dateStr] || [];
    if (currentTasks.length > 1) {
      setTaskMap(prev => {
        const [current, ...rest] = prev[dateStr];
        return { ...prev, [dateStr]: [...rest, current] };
      });
    }
  };

  const addTask = (dateStr, title, description) => {
    setTaskMap(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { id: Date.now().toString(), text: title, description: description || "" }]
    }));
  };

  const editTask = (dateStr, id, updatedTitle, updatedDescription) => {
    setTaskMap(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || []).map(t => t.id === id ? { ...t, text: updatedTitle, description: updatedDescription } : t)
    }));
  };

  const deleteTask = (dateStr, id) => {
    setTaskMap(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || []).filter(t => t.id !== id)
    }));
  };

  const moveTask = (dateStr, index, direction) => {
    const currentTasks = [...(taskMap[dateStr] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < currentTasks.length) {
      const [movedTask] = currentTasks.splice(index, 1);
      currentTasks.splice(targetIndex, 0, movedTask);
      setTaskMap(prev => ({ ...prev, [dateStr]: currentTasks }));
    }
  };

  return { 
    selectedDate, 
    setSelectedDate, 
    getTasksForDate, 
    completeTask, 
    skipTask, 
    addTask, 
    editTask,
    deleteTask, 
    moveTask,
    historyLog
  };
}