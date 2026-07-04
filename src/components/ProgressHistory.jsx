import React, { useState } from 'react';
import { getLocalDateString } from '../hooks/useBubbleStore';

export default function ProgressHistory({ historyLog, getTasksForDate }) {
  const [timeframe, setTimeframe] = useState('weekly');
  const todayStr = getLocalDateString();

  // 1. Daily Calculation parameters
  const itemsCompletedToday = historyLog[todayStr] || 0;
  const itemsLeftToday = getTasksForDate(todayStr).length;

  // 2. Weekly Calculation parameters
  const getWeeklyData = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = getLocalDateString(d);
      return {
        dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: historyLog[dateStr] || 0
      };
    });
  };
  const weeklyData = getWeeklyData();

  // 3. Monthly Calculation parameters (Generates a clean grid of the last 28 days)
  const getMonthlyGrid = () => {
    return Array.from({ length: 28 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (27 - i));
      const dateStr = getLocalDateString(d);
      const count = historyLog[dateStr] || 0;
      
      // Categorize days gently by energy states rather than cold scores
      let stateColor = 'bg-white/40 border-white/60'; // Rest / Uncharted days
      if (count > 0 && count <= 2) stateColor = 'bg-[#FFE5E9] border-[#FFA3B1]/30 text-[#FF6B8B]'; // Soft pacing day
      if (count > 2) stateColor = 'bg-gradient-to-tr from-[#FF6B8B] to-[#FF94A5] text-white shadow-sm'; // Flow state day

      return {
        dateStr,
        dayNum: d.getDate(),
        stateColor
      };
    });
  };
  const monthlyGrid = getMonthlyGrid();

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB]/60 border border-white/80 rounded-[40px] p-8 shadow-[0_30px_70px_rgba(255,163,177,0.1)] space-y-8 animate-fadeIn text-center">
      
      {/* Scope Navigation Switcher */}
      <div className="flex justify-center space-x-1 bg-white/50 backdrop-blur-md rounded-full p-1 max-w-xs mx-auto border border-[#FFE0E4]">
        {['daily', 'weekly', 'monthly'].map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all ${timeframe === t ? 'bg-[#FF6B8B] text-white shadow-sm' : 'text-[#4A3538]/50 hover:text-[#4A3538]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* DAILY INSIGHTS PANEL */}
      {timeframe === 'daily' && (
        <div className="py-6 space-y-4 animate-fadeIn">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF94A5] uppercase block">Today's Pacing</span>
          <h3 className="font-serif text-3xl text-[#3D282B] font-medium">
            {itemsCompletedToday > 0 ? `You took ${itemsCompletedToday} steps forward 🌸` : "A calm, gentle pause ✨"}
          </h3>
          <p className="text-xs font-light text-[#4A3538]/50 max-w-sm mx-auto leading-relaxed">
            {itemsLeftToday > 0 
              ? `There are currently ${itemsLeftToday} items waiting in your safe queue whenever you are ready.` 
              : "Your active list is entirely clear. Excellent work safeguarding your boundaries today."}
          </p>
        </div>
      )}

      {/* WEEKLY LINE VISUALIZATION */}
      {timeframe === 'weekly' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF94A5] uppercase block">7-Day Consistency</span>
            <p className="text-xs font-light text-[#4A3538]/50 mt-1">A soft snapshot of your momentum</p>
          </div>

          {/* Minimalist Visual Bars mapping weekly completions natively */}
          <div className="flex items-end justify-between max-w-md mx-auto h-36 pt-4 px-2">
            {weeklyData.map((data, idx) => {
              // Calculate height scale factors safely
              const maxCount = Math.max(...weeklyData.map(d => d.count), 1);
              const heightPercent = Math.max((data.count / maxCount) * 100, 8);

              return (
                <div key={idx} className="flex flex-col items-center flex-1 space-y-2 group">
                  <span className="text-[10px] font-medium text-[#FF6B8B] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {data.count}
                  </span>
                  <div className="w-6 bg-white border border-[#FFEBEF] rounded-t-full rounded-b-md flex items-end overflow-hidden h-24 shadow-inner">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#FF6B8B] to-[#FF94A5] rounded-t-full transition-all duration-500 ease-out"
                    />
                  </div>
                  <span className="text-[10px] font-light text-[#4A3538]/50">{data.dayLabel}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MONTHLY CALENDAR GRID TRACKER */}
      {timeframe === 'monthly' && (
        <div className="space-y-4 animate-fadeIn max-w-md mx-auto">
          <div className="text-center mb-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF94A5] uppercase block">Energy Calendar</span>
            <p className="text-xs font-light text-[#4A3538]/50 mt-1">28 days of celebrating action and honoring rest</p>
          </div>

          {/* 4x7 grid map */}
          <div className="grid grid-cols-7 gap-2.5 p-2 bg-white/20 border border-white/40 rounded-3xl shadow-inner">
            {monthlyGrid.map((day, idx) => (
              <div
                key={idx}
                title={`${day.dateStr}`}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-[10px] font-light transition-all duration-300 ${day.stateColor}`}
              >
                <span>{day.dayNum}</span>
              </div>
            ))}
          </div>

          {/* Calming, non-judgmental Legend keys */}
          <div className="flex justify-center items-center space-x-6 pt-2 text-[10px] text-[#4A3538]/60 font-light">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-white border border-white/80" />
              <span>Resting / Clear</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-[#FFE5E9] border border-[#FFA3B1]/20" />
              <span>Pacing Day</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-[#FF6B8B]" />
              <span>Flow State Day</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}