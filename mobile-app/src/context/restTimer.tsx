import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSetting } from 'hooks/useSetting';
import { setSetting } from 'db/mutation';

interface RestTimerContextType {
  defaultRestTime: number;
  timeRemaining: number;
  isActive: boolean;
  startTimer: (duration?: number) => void;
  stopTimer: () => void;
  adjustTimer: (adjustment: number) => void;
}

const RestTimerContext = createContext<RestTimerContextType | undefined>(
  undefined,
);

export function RestTimerProvider({ children }: { children: React.ReactNode }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const isActive = timeRemaining > 0;
  const intervalRef = useRef<number | null>(null);
  const defaultRestTime = useSetting<number>('restTimerDuration', 120);

  const startTimer = (duration?: number) => {
    const timerDuration = duration || defaultRestTime;
    setTimeRemaining(timerDuration);
  };

  const stopTimer = () => {
    setTimeRemaining(0);
  };

  const adjustTimer = (adjustment: number) => {
    if (timeRemaining > 0) {
      setTimeRemaining((prev) => Math.max(0, prev + adjustment));
    } else {
      const newDuration = Math.max(15, adjustment + Number(defaultRestTime));
      setSetting('restTimerDuration', newDuration.toString());
    }
  };

  const playCompletionSound = () => {
    console.log('Timer completed!');
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            playCompletionSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining]);

  const value: RestTimerContextType = {
    defaultRestTime,
    timeRemaining,
    isActive,
    startTimer,
    stopTimer,
    adjustTimer,
  };

  return (
    <RestTimerContext.Provider value={value}>
      {children}
    </RestTimerContext.Provider>
  );
}

export function useRestTimer() {
  const context = useContext(RestTimerContext);
  if (context === undefined) {
    throw new Error('useRestTimer must be used within a RestTimerProvider');
  }
  return context;
}
