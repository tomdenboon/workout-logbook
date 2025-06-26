import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useAudioPlayer } from 'expo-audio';
import { Vibration } from 'react-native';
import { useSetting } from 'hooks/useSetting';
import { setSetting } from 'db/mutation';

const notificationSound = require('../../assets/sounds/timer_notification.wav');

interface RestTimerContextType {
  defaultRestTime: number;
  timeRemaining: number;
  timerDuration: number;
  isActive: boolean;
  progress: number;
  startTimer: (duration?: number) => void;
  stopTimer: () => void;
  adjustTimer: (adjustment: number) => void;
}

const RestTimerContext = createContext<RestTimerContextType | undefined>(
  undefined,
);

export function RestTimerProvider({ children }: { children: React.ReactNode }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerDuration, setTimerDuration] = useState(0);
  const isActive = timeRemaining > 0;
  const intervalRef = useRef<number | null>(null);
  const defaultRestTime = useSetting<number>('restTimerDuration', 120);
  const soundSetting = useSetting<string>('restTimerSound', 'Default');
  const player = useAudioPlayer(notificationSound);

  const progress = isActive
    ? (timerDuration - timeRemaining) / timerDuration
    : 0;

  const startTimer = (duration?: number) => {
    const timerDuration = duration || defaultRestTime;
    setTimeRemaining(timerDuration);
    setTimerDuration(timerDuration);
  };

  const stopTimer = () => {
    setTimeRemaining(0);
    setTimerDuration(0);
  };

  const adjustTimer = (adjustment: number) => {
    if (timeRemaining > 0) {
      setTimeRemaining((prev) => Math.max(0, prev + adjustment));
      setTimerDuration((prev) => Math.max(0, prev + adjustment));
    } else {
      const newDuration = Math.max(15, adjustment + Number(defaultRestTime));
      setSetting('restTimerDuration', newDuration.toString());
    }
  };

  const playCompletionSound = () => {
    if (soundSetting === 'Default' && player) {
      player.seekTo(0);
      player.play();
    }

    Vibration.vibrate([0, 500, 200, 500]);
  };

  useEffect(() => {
    if (isActive) {
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
  }, [isActive]);

  const value: RestTimerContextType = {
    defaultRestTime,
    timeRemaining,
    timerDuration,
    isActive,
    progress,
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
