import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { getLocalDateString } from '../hooks/useBubbleStore';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TaskManager({ selectedDate, onDateChange, getTasks, onAddTask, onDeleteTask }) {
  const [input, setInput] = useState("");
  const currentTasks = getTasks(selectedDate);

  // Generate the current week days based on the selected target date
  const getWeekDays = () => {
    const current = new Date(selectedDate);
    const dayOfWeek = current.getDay();
    // Shift back to start the grid array on Sunday
    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - dayOfWeek);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays();
  const activeDateObj = new Date(selectedDate);
  const activeDayName = activeDateObj.toLocaleDateString('en-US', { weekday: 'long' });

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onDateChange(getLocalDateString(d));
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onDateChange(getLocalDateString(d));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(selectedDate, input.trim());
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB]/60 border border-white/80 rounded-[32px] p-6 shadow-sm space-y-6">
      
      {/* Dynamic Header Section with Arrow controls matching Screenshot */}
      <div className="flex justify-between items-center px-2">
        <button onClick={handlePrevDay} className="p-1 text-[#4A3538]/40 hover:text-[#FF6B8B] transition-colors">
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF94A5] block font-bold">Planning</span>
          <h3 className="font-serif text-xl font-medium text-[#3D282B] mt-0.5">{activeDayName}</h3>
        </div>
        <button onClick={handleNextDay} className="p-1 text-[#4A3538]/40 hover:text-[#FF6B8B] transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Weekday Row Layout with custom high-contrast styling fields */}
      <div className="flex justify-between items-center px-4 max-w-md mx-auto">
        {weekDays.map((dateObj) => {
          const dateStr = getLocalDateString(dateObj);
          const isSelected = dateStr === selectedDate;
          const dayLabel = WEEKDAYS[dateObj.getDay()];

          return (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className={`flex flex-col items-center space-y-1 group transition-all`}
            >
              <span className={`text-[11px] font-light ${isSelected ? 'text-[#FF6B8B] font-medium' : 'text-[#4A3538]/40 group-hover:text-[#4A3538]/70'}`}>
                {dayLabel}
              </span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B] animate-scaleIn" />
              )}
            </button>
          );
        })}
      </div>

      {/* Task List Entries Container */}
      <div className="space-y-2 max-w-xl mx-auto pt-2">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <div 
              key={task.id} 
              className="flex justify-between items-center bg-white/40 border border-[#FFEBEF]/50 rounded-2xl px-5 py-3.5 shadow-sm hover:bg-white/70 transition-all group animate-fadeIn"
            >
              <div className="flex items-center space-x-3 text-sm text-[#4A3538]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFA3B1]" />
                <span className="font-light tracking-wide">{task.text}</span>
              </div>
              <button 
                onClick={() => onDeleteTask(selectedDate, task.id)}
                className="opacity-0 group-hover:opacity-100 text-[#4A3538]/30 hover:text-[#FF6B8B] transition-all p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#4A3538]/40 italic text-center py-4">No tasks planned for this day.</p>
        )}
      </div>

      {/* Input Action Form matching layout style */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-xl mx-auto pt-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add a tiny step for ${activeDayName}...`}
          className="flex-1 px-5 py-3.5 text-xs rounded-full border border-[#FFE0E4] bg-white/80 text-[#4A3538] placeholder-[#4A3538]/30 focus:outline-none focus:border-[#FF6B8B] transition-colors font-light"
        />
        <button 
          type="submit"
          className="px-6 py-3.5 bg-[#FF6B8B] hover:bg-[#FF5276] text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1.5 transition-all active:scale-98"
        >
          <Plus size={12} strokeWidth={3} />
          <span>Add</span>
        </button>
      </form>

    </div>
  );
}