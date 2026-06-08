"use client";

import { useState, useEffect } from "react";
import { IconClock, IconCalendarEvent, IconHourglass } from "@tabler/icons-react";

interface TimeCounterProps {
  time: string | Date | number;
  compact?: boolean;
  showIcon?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TimeCounter({ 
  time, 
  compact = false, 
  showIcon = true,
  className = "",
  onComplete 
}: TimeCounterProps) {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(time).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        if (!isPast && onComplete) onComplete();
        setIsPast(true);
        return;
      }

      setIsPast(false);
      setTimeLeft({
        years: Math.floor(difference / (1000 * 60 * 60 * 24)),
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [time, onComplete]);

  const formatNumber = (num: number): string => num.toString().padStart(2, "0");

  if (isPast) {
    return (
      <div className={`flex items-center gap-1.5 font-medium text-lime-500 dark:text-green-400 ${className}`}>
        
        <span>Event started</span>
      </div>
    );
  }

  // Compact version for cards (single line)
  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 text-muted-foreground ${className}`}>
        
        <span className="font-mono">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  // Default version with days
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="font-mono font-medium  ">
        {timeLeft.days > 0 && `${timeLeft.days}d-`}
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </span>
    </div>
  );
}