// components/Timer.tsx
import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onUpdateTime: (time: number) => void;
  keyReset: number; // To reset the timer when the question changes
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, onUpdateTime, keyReset }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime); // Reset timer when keyReset changes

    const interval = setInterval(() => {
      setTime((currentTime) => {
        onUpdateTime(currentTime);
        if (currentTime === 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime, keyReset]);

  return <div className="timer-display">{time}</div>;
};

export default Timer;
