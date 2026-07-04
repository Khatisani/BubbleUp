import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, ArrowUp, ArrowDown, Edit3, X } from 'lucide-react';
import { getLocalDateString } from '../hooks/useBubbleStore';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TaskManager({ selectedDate, onDateChange, getTasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  
  const currentTasks = getTasks(selectedDate);
  const activeDateObj = new Date(selectedDate);
  const activeDayName = activeDateObj.toLocaleDateString('en-US', { weekday: 'long' });

  // Generate week grid numbers
  const getWeekDays = () => {
    const current = new Date(selectedDate);
    const dayOfWeek = current.getDay();
    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - dayOfWeek);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays();

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
    if (title.trim()) {
      onAddTask(selectedDate, title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB]/60 border border-white/80 rounded-[32px] p-6 shadow-sm space-y-6">
      
      {/* Title Header Matching Screenshot 2026-07-05 at 00.43.20.png */}
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

      {/* Weekday Labels + Date Numbers Display */}
      <div className="flex justify-between items-center px-4 max-w-xl mx-auto">
        {weekDays.map((dateObj) => {
          const dateStr = getLocalDateString(dateObj);
          const isSelected = dateStr === selectedDate;
          const dayLabel = WEEKDAYS[dateObj.getDay()];
          const dayNumber = dateObj.getDate();

          return (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className="flex flex-col items-center space-y-1 group transition-all"
            >
              <span className={`text-[11px] ${isSelected ? 'text-[#FF6B8B] font-semibold' : 'text-[#4A3538]/40'}`}>
                {dayLabel} <span className="text-[9px] opacity-70">({dayNumber})</span>
              </span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Stream Container */}
      <div className="space-y-3 max-w-xl mx-auto pt-2">
        {currentTasks.length > 0 ? (
          currentTasks.map((task, index) => (
            <div 
              key={task.id} 
              className="bg-white/50 border border-[#FFEBEF] rounded-2xl px-5 py-4 shadow-sm flex justify-between items-center group transition-all hover:bg-white/80"
            >
              <div 
                onClick={() => setEditingTask(task)}
                className="flex-1 cursor-pointer pr-4"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B]" />
                  <h4 className="text-sm font-medium text-[#3D282B] tracking-wide">{task.text}</h4>
                </div>
                {task.description && (
                  <p className="text-xs text-[#4A3538]/60 font-light mt-1 pl-3.5 leading-relaxed">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Functional Row Control Systems */}
              <div className="flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <button 
                  disabled={index === 0}
                  onClick={() => onMoveTask(selectedDate, index, 'up')}
                  className="p-1 text-[#4A3538] hover:text-[#FF6B8B] disabled:opacity-20"
                >
                  <ArrowUp size={14} />
                </button>
                <button 
                  disabled={index === currentTasks.length - 1}
                  onClick={() => onMoveTask(selectedDate, index, 'down')}
                  className="p-1 text-[#4A3538] hover:text-[#FF6B8B] disabled:opacity-20"
                >
                  <ArrowDown size={14} />
                </button>
                <button 
                  onClick={() => setEditingTask(task)}
                  className="p-1 text-[#4A3538] hover:text-[#FF6B8B]"
                >
                  <Edit3 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#4A3538]/40 italic text-center py-6">
            No tasks planned for this day.
          </p>
        )}
      </div>

      {/* Input Form Fields matching Screenshot 2026-07-05 at 00.43.20.png style details */}
      <form onSubmit={handleSubmit} className="bg-white/40 border border-[#FFE0E4]/60 rounded-3xl p-4 max-w-xl mx-auto space-y-3 shadow-sm">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Add a tiny step title for ${activeDayName}...`}
          className="w-full px-5 py-3 text-xs rounded-full border border-[#FFE0E4] bg-white text-[#4A3538] placeholder-[#4A3538]/30 focus:outline-none focus:border-[#FF6B8B] font-light"
        />
        <div className="flex gap-2">
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description / short note (optional)..."
            className="flex-1 px-5 py-3 text-[11px] rounded-full border border-[#FFE0E4] bg-white text-[#4A3538] placeholder-[#4A3538]/30 focus:outline-none focus:border-[#FF6B8B] font-light"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-[#FF6B8B] hover:bg-[#FF5276] text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1.5 transition-all active:scale-98"
          >
            <Plus size={12} strokeWidth={3} />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Modular Inline Task Inspector & Editor Dropdown Card Overlay */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFBFB] border border-[#FFEBEF] rounded-[32px] p-6 w-full max-w-md shadow-xl space-y-4 relative">
            <button 
              onClick={() => setEditingTask(null)}
              className="absolute top-4 right-4 text-[#4A3538]/40 hover:text-[#FF6B8B]"
            >
              <X size={16} />
            </button>
            
            <h4 className="font-serif text-lg font-medium text-[#3D282B] pr-6">Inspect & Update Step</h4>
            
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-bold text-[#FF94A5] uppercase tracking-wider block">Title</label>
              <input 
                type="text" 
                value={editingTask.text}
                onChange={(e) => setEditingTask({...editingTask, text: e.target.value})}
                className="w-full px-4 py-3 text-xs rounded-xl border border-[#FFE0E4] bg-white text-[#4A3538] focus:outline-none focus:border-[#FF6B8B]"
              />

              <label className="text-[10px] font-bold text-[#FF94A5] uppercase tracking-wider block">Description</label>
              <textarea 
                rows={3}
                value={editingTask.description || ""}
                onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                className="w-full px-4 py-3 text-xs rounded-xl border border-[#FFE0E4] bg-white text-[#4A3538] focus:outline-none focus:border-[#FF6B8B] resize-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  onDeleteTask(selectedDate, editingTask.id);
                  setEditingTask(null);
                }}
                className="flex-1 py-3 bg-red-50 hover:bg-red-100/70 border border-red-200 text-red-500 text-xs font-medium rounded-full flex items-center justify-center space-x-1.5 transition-all active:scale-98"
              >
                <Trash2 size={12} />
                <span>Delete Task</span>
              </button>
              
              <button
                onClick={() => {
                  onEditTask(selectedDate, editingTask.id, editingTask.text, editingTask.description);
                  setEditingTask(null);
                }}
                className="flex-1 py-3 bg-[#FF6B8B] hover:bg-[#FF5276] text-white text-xs font-medium rounded-full flex items-center justify-center transition-all active:scale-98 shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}