import { useEffect, useMemo, useState } from 'react';

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

  const prependZero = (num: number) => (num >= 10 ? num : `0${num}`);

  return `${hrs > 0 ? hrs + ':' : ''}${prependZero(mins)}:${prependZero(secs)}`;
}

function useTimer(format: 'digital' | 'pretty', start?: string, end?: string) {
  const [endDate, setEndDate] = useState(end ? new Date(end) : new Date());
  const startDate = useMemo(() => (start ? new Date(start) : new Date()), [start]);
  const milliseconds = endDate.getTime() - startDate.getTime();

  useEffect(() => {
    let intervalId: number;
    if (!end) {
      intervalId = setInterval(() => {
        setEndDate(new Date());
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [end]);

  return formatTime(milliseconds, format);
}

export default useTimer;
