import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, RotateCcw } from 'lucide-react';

export default function FocusCard({ currentTask, onDone, onSkip }) {
  const [isTiming, setIsTiming] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Initialize countdown timer whenever the top prioritized queue item shifts
  useEffect(() => {
    if (currentTask) {
      setSecondsLeft(currentTask.duration * 60);
      setIsTiming(false);
    }
  }, [currentTask]);

  // Master countdown clock ticker loop
  useEffect(() => {
    let intervalId = null;
    if (isTiming && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTiming) {
      setIsTiming(false);
    }
    return () => clearInterval(intervalId);
  }, [isTiming, secondsLeft]);

  if (!currentTask) {
    return (
      <div className="w-full bg-white/60 backdrop-blur-md rounded-[32px] p-10 border border-white/40 shadow-sm text-center space-y-3">
        <span className="text-3xl block">🌸</span>
        <h3 className="font-serif text-2xl text-[#3D282B] font-semibold">Rest — you earned it</h3>
        <p className="text-xs text-[#4A3538]/50 max-w-sm mx-auto font-light">Your queue is completely clear. Time to breathe.</p>
      </div>
    );
  }

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-sm text-center space-y-6 transition-all duration-500">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF94A5]">Next Tiny Step</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#3D282B] mt-1 tracking-tight px-4 leading-tight">
          {currentTask.text}
        </h2>
        {currentTask.description && (
          <p className="text-xs text-[#4A3538]/50 font-light mt-2 px-6 max-w-md mx-auto leading-relaxed">
            {currentTask.description}
          </p>
        )}
      </div>

      {/* Embedded Active Focus Visual Block */}
      <div className="py-4 flex flex-col items-center justify-center space-y-3">
        <div className={`font-mono text-4xl font-bold tracking-wider ${isTiming ? 'text-[#FF6B8B] animate-pulse' : 'text-[#3D282B]/80'}`}>
          {formatTime(secondsLeft)}
        </div>
        
        {isTiming && (
          <span className="text-[10px] uppercase tracking-widest text-[#FF94A5] font-semibold">Focusing Engine Active</span>
        )}
      </div>

      {/* Dynamic Operational Button Controls Stack */}
      <div className="flex flex-col space-y-2.5 max-w-md mx-auto w-full">
        {!isTiming && secondsLeft === (currentTask.duration * 60) ? (
          <button
            onClick={() => setIsTiming(true)}
            className="w-full py-3.5 bg-[#FF6B8B] hover:bg-[#FF5276] text-white text-xs font-semibold rounded-full shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
          >
            <Play size={14} fill="currentColor" />
            <span>I want to do this</span>
          </button>
        ) : (
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setIsTiming(!isTiming)}
              className="flex-1 py-3 bg-white border border-[#FFE0E4] hover:bg-[#FFF4F5] text-[#4A3538]/70 text-xs font-medium rounded-full flex items-center justify-center space-x-1.5 shadow-sm"
            >
              {isTiming ? <Pause size={13} /> : <Play size={13} />}
              <span>{isTiming ? 'Pause' : 'Resume'}</span>
            </button>

            {secondsLeft === 0 || !isTiming ? (
              <button
                onClick={() => {
                  setIsTiming(false);
                  onDone();
                }}
                className="flex-1 py-3 bg-[#68D391] hover:bg-[#52B778] text-white text-xs font-semibold rounded-full flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Check size={13} strokeWidth={3} />
                <span>Done — I did it</span>
              </button>
            ) : null}
          </div>
        )}

        <button
          onClick={onSkip}
          className="w-full py-3 bg-white/40 border border-white/80 hover:bg-white/80 text-[#4A3538]/40 hover:text-[#4A3538]/70 text-xs font-light rounded-full transition-all shadow-sm"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}