import React from 'react';

export default function FocusCard({ currentTask, onDone, onSkip }) {
  // Check if there is an active task text to handle empty arrays cleanly
  const hasTasks = currentTask && currentTask.text && currentTask.text.trim() !== "";
  
  // Set the exact text based on state
  const displayTitle = hasTasks ? currentTask.text : "Rest — you earned it 🌸";
  const displaySubtitle = hasTasks 
    ? "One thing. That's all. You can do this — or skip. Both are okay."
    : "Your queue is completely clear. Time to breathe.";

  return (
    <div className="w-full max-w-3xl bg-[#FFFBFB] rounded-[40px] px-8 py-14 border border-white/80 shadow-[0_30px_70px_rgba(255,163,177,0.12)] text-center space-y-6 relative overflow-hidden transition-all duration-500">
      
      {/* Soft sub-header */}
      <span className="text-[11px] font-bold tracking-[0.2em] text-[#FF94A5] uppercase block mb-2">
        Next Tiny Step
      </span>
      
      {/* Main Big Focus Text matching your typography */}
      <h2 className="text-3xl md:text-4xl font-serif font-medium px-4 text-[#3D282B] tracking-tight leading-normal min-h-[4.5rem] flex items-center justify-center">
        {displayTitle}
      </h2>
      
      {/* Explanatory supportive tagline snippet */}
      <p className="text-xs md:text-sm font-light text-[#4A3538]/50 tracking-wide max-w-md mx-auto transition-opacity duration-300">
        {displaySubtitle}
      </p>
      
      {/* Dynamic Actions Render */}
      {hasTasks && (
        <div className="pt-6 flex flex-col items-center justify-center gap-4 w-full max-w-xl mx-auto animate-fadeIn">
          
          {/* Skip Button - Full width pill */}
          <button 
            onClick={onSkip}
            className="w-full py-3.5 bg-white border border-[#FFE0E4] hover:bg-[#FFF4F5] text-[#4A3538]/50 font-light rounded-full transition-all active:scale-[0.99] text-sm tracking-wide flex items-center justify-center space-x-2 shadow-sm"
          >
            <span>w Skip for now</span>
          </button>

          {/* Done Button - Full width high contrast pink pill */}
          <button 
            onClick={onDone}
            className="w-full py-4 bg-[#FF5276] hover:bg-[#FF6B8B] text-white font-medium rounded-full shadow-[0_8px_25px_rgba(255,107,139,0.25)] transition-all active:scale-[0.99] text-sm tracking-wide flex items-center justify-center space-x-2"
          >
            <span>✓ Done — I did it</span>
          </button>

        </div>
      )}

    </div>
  );
}