"use client"

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SOSButtonProps {
  onTrigger: () => void;
  isLoading?: boolean;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onTrigger, isLoading }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 2000; // 2 seconds

  const startPress = () => {
    if (isLoading) return;
    setIsPressing(true);
    setProgress(0);

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(newProgress);
    }, 10);

    timerRef.current = setTimeout(() => {
      onTrigger();
      cancelPress();
    }, HOLD_DURATION);
  };

  const cancelPress = () => {
    setIsPressing(false);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => cancelPress();
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Progress Ring */}
      <svg className="absolute w-64 h-64 -rotate-90 pointer-events-none">
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted"
        />
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={754}
          strokeDashoffset={754 - (754 * progress) / 100}
          className={cn(
            "text-primary transition-all duration-75",
            progress === 100 ? "text-secondary" : "text-primary"
          )}
        />
      </svg>

      <button
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        className={cn(
          "relative w-56 h-56 rounded-full bg-primary text-white font-black text-5xl transition-all active:scale-95 sos-glow select-none outline-none ring-offset-4 ring-offset-background focus:ring-4 ring-primary",
          isPressing && "scale-105",
          isLoading && "opacity-50 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Loader2 className="w-16 h-16 animate-spin" />
          ) : (
            <>
              <span>SOS</span>
              <span className="text-xs font-bold uppercase tracking-widest mt-2 opacity-80">
                {isPressing ? "HOLDING..." : "PRESS & HOLD"}
              </span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};
