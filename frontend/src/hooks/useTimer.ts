import { useEffect, useState } from 'react';

export function digitalTimerToMilliseconds(digitalTimer: string) {
  const nums = digitalTimer.split(':').map(Number);
  nums.reverse();
  const [secs, mins, hrs] = nums;
  console.log(((hrs ?? 0) * 60 * 60 + mins * 60 + secs) * 1000);
  return ((hrs ?? 0) * 60 * 60 + mins * 60 + secs) * 1000;
}

export function formatTime(milliseconds: number, format: 'digital' | 'pretty') {
  const ms = milliseconds % 1000;
  milliseconds = (milliseconds - ms) / 1000;
  const secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  const mins = milliseconds % 60;
  const hrs = (milliseconds - mins) / 60;

  if (format === 'pretty') {
    if (hrs > 0) {
      return `${hrs} hrs ${mins} mins`;
    }

    if (mins > 0) {
      return `${mins} mins ${secs} secs`;
    }

    return `${secs} secs`;
  }

  const prependZero = (num: number) => num.toString().padStart(2, '0');

  return `${hrs > 0 ? hrs + ':' : ''}${prependZero(mins)}:${prependZero(secs)}`;
}

export function useWorkoutTimer(start?: string, end?: string) {
  return useTimer(
    start ? new Date(start).getTime() : Date.now(),
    end ? new Date(end).getTime() : undefined
  );
}

export function useTimer(start: number, end?: number, interval = 10) {
  const [endDate, setEndDate] = useState(end ? end : Date.now());

  useEffect(() => {
    let intervalId: number;
    if (!end) {
      intervalId = setInterval(() => {
        setEndDate(Date.now());
      }, interval);
    } else {
      setEndDate(end ? end : Date.now());
    }

    return () => clearInterval(intervalId);
  }, [end, interval]);

  return endDate - start;
}
