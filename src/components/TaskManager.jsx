import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, ArrowUp, ArrowDown, Edit3, X, Clock } from 'lucide-react';
import { getLocalDateString } from '../hooks/useBubbleStore';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TaskManager({ selectedDate, onDateChange, getTasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("25"); // Defaulting target countdown limit
  const [editingTask, setEditingTask] = useState(null);
  
  const currentTasks = getTasks(selectedDate);
  const activeDateObj = new Date(selectedDate);
  const activeDayName = activeDateObj.toLocaleDateString('en-US', { weekday: 'long' });

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
      onAddTask(selectedDate, title.trim(), description.trim(), duration);
      setTitle("");
      setDescription("");
      setDuration("25");
    }
  };

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB]/60 border border-white/80 rounded-[32px] p-6 shadow-sm space-y-6">
      
      {/* Calendar Strip Header */}
      <div className="flex justify-between items-center px-2">
        <button onClick={handlePrevDay} className="p-1 text-[#4A3538]/40 hover:text-[#FF6B8B]">
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF94A5] block font-bold">Planning</span>
          <h3 className="font-serif text-xl font-medium text-[#3D282B] mt-0.5">{activeDayName}</h3>
        </div>
        <button onClick={handleNextDay} className="p-1 text-[#4A3538]/40 hover:text-[#FF6B8B]">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Weekday Labels Grid mapping numbers next to strings */}
      <div className="flex justify-between items-center px-4 max-w-xl mx-auto">
        {weekDays.map((dateObj) => {
          const dateStr = getLocalDateString(dateObj);
          const isSelected = dateStr === selectedDate;
          return (
            <button key={dateStr} onClick={() => onDateChange(dateStr)} className="flex flex-col items-center space-y-1">
              <span className={`text-[11px] ${isSelected ? 'text-[#FF6B8B] font-semibold' : 'text-[#4A3538]/40'}`}>
                {WEEKDAYS[dateObj.getDay()]} <span className="text-[9px] opacity-70">({dateObj.getDate()})</span>
              </span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B]" />}
            </button>
          );
        })}
      </div>

      {/* List Streams Content Block */}
      <div className="space-y-3 max-w-xl mx-auto pt-2">
        {currentTasks.length > 0 ? (
          currentTasks.map((task, index) => (
            <div key={task.id} className="bg-white/50 border border-[#FFEBEF] rounded-2xl px-5 py-4 shadow-sm flex justify-between items-center group hover:bg-white/80 transition-all">
              <div onClick={() => setEditingTask(task)} className="flex-1 cursor-pointer pr-4">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B]" />
                  <h4 className="text-sm font-medium text-[#3D282B] tracking-wide">{task.text}</h4>
                  <span className="text-[10px] px-2 py-0.5 bg-[#FFF4F5] text-[#FF6B8B] font-mono rounded-full border border-[#FFE0E4]">
                    {task.duration || 25}m
                  </span>
                </div>
                {task.description && (
                  <p className="text-xs text-[#4A3538]/60 font-light mt-1 pl-3.5 leading-relaxed">{task.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <button disabled={index === 0} onClick={() => onMoveTask(selectedDate, index, 'up')} className="p-1 disabled:opacity-20"><ArrowUp size={14} /></button>
                <button disabled={index === currentTasks.length - 1} onClick={() => onMoveTask(selectedDate, index, 'down')} className="p-1 disabled:opacity-20"><ArrowDown size={14} /></button>
                <button onClick={() => setEditingTask(task)} className="p-1"><Edit3 size={14} /></button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-[#4A3538]/40 italic text-center py-6">No tasks planned for this day.</p>
        )}
      </div>

      {/* Input Entry Box containing Time selection settings */}
      <form onSubmit={handleSubmit} className="bg-white/40 border border-[#FFE0E4]/60 rounded-3xl p-4 max-w-xl mx-auto space-y-3 shadow-sm">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Add a tiny step title for ${activeDayName}...`}
          className="w-full px-5 py-3 text-xs rounded-full border border-[#FFE0E4] bg-white text-[#4A3538] placeholder-[#4A3538]/30 focus:outline-none"
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description / short note (optional)..."
            className="flex-1 px-5 py-3 text-[11px] rounded-full border border-[#FFE0E4] bg-white text-[#4A3538] placeholder-[#4A3538]/30 focus:outline-none"
          />
          
          <div className="flex gap-2 items-center">
            <div className="flex items-center space-x-1 bg-white border border-[#FFE0E4] rounded-full px-3 py-1.5">
              <Clock size={12} className="text-[#FF6B8B]" />
              <input 
                type="number" 
                min="1" 
                max="180"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-10 text-center font-mono text-xs bg-transparent text-[#4A3538] focus:outline-none"
              />
              <span className="text-[10px] text-[#4A3538]/40 font-light">m</span>
            </div>

            <button type="submit" className="px-5 py-3 bg-[#FF6B8B] hover:bg-[#FF5276] text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1 transition-all">
              <Plus size={12} strokeWidth={3} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>

      {/* Full Edit Overlay Modal Box */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFBFB] border border-[#FFEBEF] rounded-[32px] p-6 w-full max-w-md shadow-xl space-y-4 relative">
            <button onClick={() => setEditingTask(null)} className="absolute top-4 right-4 text-[#4A3538]/40"><X size={16} /></button>
            <h4 className="font-serif text-lg font-medium text-[#3D282B]">Inspect & Update Step</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-[#FF94A5] uppercase tracking-wider block mb-1">Title</label>
                <input type="text" value={editingTask.text} onChange={(e) => setEditingTask({...editingTask, text: e.target.value})} className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#FFE0E4]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#FF94A5] uppercase tracking-wider block mb-1">Description</label>
                <textarea rows={2} value={editingTask.description || ""} onChange={(e) => setEditingTask({...editingTask, description: e.target.value})} className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#FFE0E4] resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#FF94A5] uppercase tracking-wider block mb-1">Target Duration (Minutes)</label>
                <input type="number" value={editingTask.duration || 25} onChange={(e) => setEditingTask({...editingTask, duration: e.target.value})} className="w-32 px-4 py-2.5 font-mono text-xs rounded-xl border border-[#FFE0E4]" />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button onClick={() => { onDeleteTask(selectedDate, editingTask.id); setEditingTask(null); }} className="flex-1 py-2.5 bg-red-50 text-red-500 text-xs font-medium rounded-full flex items-center justify-center space-x-1"><Trash2 size={12} /><span>Delete</span></button>
              <button onClick={() => { onEditTask(selectedDate, editingTask.id, editingTask.text, editingTask.description, editingTask.duration); setEditingTask(null); }} className="flex-1 py-2.5 bg-[#FF6B8B] text-white text-xs font-semibold rounded-full">Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}