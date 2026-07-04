import React from 'react';
import { Play, Check } from 'lucide-react';

export default function FocusCard({ currentTask, onDone, onSkip }) {
  // Gracefully handles standard raw objects or strings falling back
  const displayTitle = typeof currentTask === 'string' ? currentTask : currentTask?.text;

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB] rounded-[40px] px-8 py-12 border border-white/80 shadow-[0_30px_70px_rgba(255,163,177,0.12)] text-center space-y-6 relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(255,163,177,0.18)]">
      
      {/* Tiny soft sub-header */}
      <span className="text-[11px] font-bold tracking-[0.2em] text-[#FF94A5] uppercase block mb-2">
        Next Tiny Step
      </span>
      
      {/* Main Big Focus Text matching typography styling */}
      <h2 className="text-3xl md:text-4xl font-serif font-medium px-4 text-[#3D282B] tracking-tight leading-normal min-h-[4.5rem] flex items-center justify-center">
        {displayTitle}
      </h2>
      
      {/* Explanatory supportive tagline snippet */}
      <p className="text-xs md:text-sm font-light text-[#4A3538]/50 tracking-wide max-w-md mx-auto">
        One thing. That's all. You can do this — or skip. Both are okay.
      </p>
      
      {/* Perfect matched actions alignment layout */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
        
        <button 
          onClick={onSkip}
          className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#FFE0E4] hover:bg-[#FFF4F5] text-[#4A3538]/70 font-medium rounded-full transition-all active:scale-98 text-xs tracking-wider flex items-center justify-center space-x-2 shadow-sm"
        >
          <Play size={12} className="opacity-60 rotate-180 transform" />
          <span>Skip for now</span>
        </button>

        <button 
          onClick={onDone}
          className="w-full sm:flex-1 py-4 bg-gradient-to-r from-[#FF6B8B] to-[#FF5276] hover:brightness-105 text-white font-medium rounded-full shadow-[0_8px_25px_rgba(255,107,139,0.35)] transition-all active:scale-98 text-sm tracking-wide flex items-center justify-center space-x-2"
        >
          <Check size={16} strokeWidth={2.5} />
          <span>Done — I did it</span>
        </button>

      </div>

    </div>
  );
}