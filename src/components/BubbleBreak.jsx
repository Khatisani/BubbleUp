import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw } from 'lucide-react';

const SUPPORTIVE_QUOTES = [
  "Progress over perfection. 🌸",
  "You are doing completely enough.",
  "Take a deep, slow breath right now.",
  "One tiny step counts, no matter how small.",
  "Your worth is not tied to your productivity. ✨",
  "It's safe to rest. The world can wait.",
  "Be gentle with your brilliant mind today.",
  "Transitions are hard. Give your brain a moment to shift.",
  "You don't have to finish it today, just looking at it is a win.",
  "Your energy level fluctuates, and that is completely natural.",
  "Lower the bar until it feels safe to cross.",
  "You aren't lazy; you are just processing a very loud world. 🎧",
  "Brain fog is a sign your nervous system needs protection.",
  "Small steps still create momentum.",
  "It is okay to do things differently than neurotypical standards.",
  "Honor your sensory boundaries. You earn your peace.",
  "A 5-minute pause is a tool, not a waste of time. ⏱️",
  "Pop away the pressure. One bubble at a time.",
  "Your timeline is entirely your own.",
  "You can start, stop, and try again. No judgment here.",
  "You are navigating a world not built for your wiring. Be proud.",
  "Breathe in calm, breathe out expectations.",
  "An overstimulated brain just needs a soft place to land.",
  "Just opening the file folder counts as starting. 💻",
  "Your safe space is here. Take all the time you need.",
  "A pause right now protects your energy for later.",
  "You are doing the best you can with the fuel you have.",
  "No guilt. No shame. Just floating bubbles.",
  "Action follows comfort. Make yourself cozy first. 🧸",
  "You have crossed 100% of your hardest campus days so far."
];

const BUBBLE_COLORS = [
  { name: 'Pink', gradient: 'from-[#FF6B8B]/80 via-[#FFA3B1]/60 to-[#FFF0F2]/90', particle: '#FF5276' },
  { name: 'Blue', gradient: 'from-[#4299E1]/80 via-[#63B3ED]/60 to-[#EBF8FF]/90', particle: '#3182CE' },
  { name: 'Purple', gradient: 'from-[#805AD5]/80 via-[#9F7AEA]/60 to-[#F7FAFC]/90', particle: '#6B46C1' },
  { name: 'Green', gradient: 'from-[#38A169]/80 via-[#48BB78]/60 to-[#F0FFF4]/90', particle: '#2F855A' }
];

export default function BubbleBreak({ isOpen, onClose, onPop }) {
  const [quote, setQuote] = useState("Ready to coordinate? Pop the target color below...");
  const [bubbles, setBubbles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [colorTimeLeft, setColorTimeLeft] = useState(30);
  const [targetColor, setTargetColor] = useState(BUBBLE_COLORS[0]);
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    let timerId = null;
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setQuote("Time's up! You did great. Ready to take one tiny step? 🌸");
    }
    return () => clearInterval(timerId);
  }, [isOpen, isActive, timeLeft]);

  useEffect(() => {
    if (!isOpen || !isActive || timeLeft === 0) return;
    let colorTimerId = setInterval(() => {
      setColorTimeLeft(prev => {
        if (prev <= 1) {
          const filtered = BUBBLE_COLORS.filter(c => c.name !== targetColor.name);
          const nextColor = filtered[Math.floor(Math.random() * filtered.length)];
          setTargetColor(nextColor);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(colorTimerId);
  }, [isOpen, isActive, targetColor, timeLeft]);

  useEffect(() => {
    if (!isOpen || !isActive) {
      setBubbles([]);
      return;
    }
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const size = Math.random() * 45 + 60;
      const left = Math.random() * 85;
      const wobble = Math.random() * 100 - 50;
      const speed = Math.random() * 5 + 9; // Relaxed speed
      const colorProfile = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];

      setBubbles(prev => [...prev, { id, size, left, wobble, speed, colorProfile }]);
    }, 800);
    return () => clearInterval(interval);
  }, [isOpen, isActive]);

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleBubbleClick = (e, bubble) => {
    e.preventDefault();
    e.stopPropagation();

    // Check matching requirements
    if (bubble.colorProfile.name !== targetColor.name) {
      return; // Soft bounce escape
    }

    // Trigger state callbacks
    if (onPop) onPop();
    
    // Create explosive burst particles immediately using actual window mouse coordinates
    createParticles(e.clientX, e.clientY, bubble.colorProfile.particle);

    // Filter clicked bubble item out of screen view instantly
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
    
    // Switch motivation quotes immediately
    const nextQuote = SUPPORTIVE_QUOTES[Math.floor(Math.random() * SUPPORTIVE_QUOTES.length)];
    setQuote(nextQuote);
  };

  const createParticles = (x, y, color) => {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      // Set absolute highest z-index on exploded particles
      p.className = 'fixed rounded-full pointer-events-none z-[9999] transition-all duration-500 ease-out';
      p.style.width = `${Math.random() * 6 + 4}px`;
      p.style.height = p.style.width;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.backgroundColor = color;

      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = Math.random() * 50 + 25;
      const mx = Math.cos(angle) * velocity;
      const my = Math.sin(angle) * velocity;

      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${mx}px, ${my}px) scale(0)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FFF4F5]/98 z-50 overflow-hidden flex flex-col justify-between p-6 select-none animate-fadeIn">
      
      {/* Top HUD Controls - z-40 so items stay accessible but behind bubble fields */}
      <div className="w-full flex justify-between items-center z-40 relative">
        <div>
          <h2 className="text-xl font-serif font-semibold text-[#3D282B]">Bubble Break</h2>
          <p className="text-xs text-[#4A3538]/50 mt-0.5">Your safe transition space</p>
        </div>

        {isActive && timeLeft > 0 && (
          <div className="bg-white/90 border border-[#FFE0E4] rounded-full px-6 py-2 flex items-center space-x-2.5 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#4A3538]/60">Target:</span>
            <span style={{ color: targetColor.particle }} className="text-xs font-bold uppercase tracking-widest animate-pulse">
              Pop {targetColor.name}
            </span>
            <span className="text-[10px] text-[#4A3538]/30 font-mono">({colorTimeLeft}s)</span>
          </div>
        )}

        <div className="bg-white/80 border border-[#FFE0E4] rounded-full px-5 py-2 flex items-center space-x-3 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-sm font-semibold tracking-wider text-[#3D282B]">
            {formatTime(timeLeft)}
          </span>
        </div>

        <button 
          onClick={onClose} 
          className="p-2.5 rounded-full bg-white shadow-sm border border-[#FFE0E4] text-[#4A3538]/50 hover:text-[#FF6B8B] z-[60] relative"
        >
          <X size={18} />
        </button>
      </div>

      {/* Center Affirmations Board - Lowered to z-30 with full mouse-passthrough */}
      <div className="absolute inset-x-6 top-1/3 text-center pointer-events-none z-30 px-4 max-w-xl mx-auto">
        <p className="text-xl md:text-2xl font-serif font-medium text-[#3D282B] leading-relaxed drop-shadow-sm">
          {quote}
        </p>
      </div>

      {/* CRITICAL FIXED LAYOUT CANVAS: Moved to z-50 to ensure bubbles sit on top of everything and click instantly */}
      <div ref={containerRef} className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
        {bubbles.map(b => (
          <button
            key={b.id}
            onClick={(e) => handleBubbleClick(e, b)}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              bottom: '-120px',
              animationDuration: `${b.speed}s`,
              '--wobble': `${b.wobble}px`
            }}
            className={`absolute rounded-full cursor-pointer bubble-animate bg-gradient-to-tr ${b.colorProfile.gradient} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.05),inset_4px_4px_10px_rgba(255,255,255,0.8)] border border-white/70 pointer-events-auto active:scale-90 transition-transform`}
          />
        ))}
      </div>

      <div className="w-full text-center text-[10px] text-[#4A3538]/30 tracking-widest z-40 font-light uppercase">
        {isActive ? "Sensory focus mode active..." : "timer paused"}
      </div>

    </div>
  );
}