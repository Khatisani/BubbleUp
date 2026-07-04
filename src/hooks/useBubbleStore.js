import { useState, useEffect } from 'react';

const INITIAL_TASKS = [
  { id: 1, text: "Drink a glass of water 💧" },
  { id: 2, text: "Stand up and do a 30-second stretch 🌸" },
  { id: 3, text: "Open course file folder on laptop 💻" },
  { id: 4, text: "Put phone face down across the room 🔇" }
];

export function useBubbleStore() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('bubble_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('bubble_stats');
    return saved ? JSON.parse(saved) : { completed: 0, popped: 0 };
  });

  useEffect(() => {
    localStorage.setItem('bubble_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bubble_stats', JSON.stringify(stats));
  }, [stats]);

  const completeTask = () => {
    if (tasks.length > 0) {
      setTasks(prev => prev.slice(1));
      setStats(prev => ({ ...prev, completed: prev.completed + 1 }));
    }
  };

  const skipTask = () => {
    if (tasks.length > 1) {
      setTasks(prev => {
        const [current, ...rest] = prev;
        return [...rest, current];
      });
    }
  };

  const addTask = (text) => {
    setTasks(prev => [...prev, { id: Date.now(), text }]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const incrementPopped = () => {
    setStats(prev => ({ ...prev, popped: prev.popped + 1 }));
  };

  return { tasks, stats, completeTask, skipTask, addTask, deleteTask, incrementPopped };
}