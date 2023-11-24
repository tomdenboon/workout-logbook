import { useCallback, useEffect, useMemo, useState } from 'react';

function useTimer(start?: string, end?: string) {
  const [endDate, setEndDate] = useState(end ? new Date(end) : new Date());
  const startDate = useMemo(() => (start ? new Date(start) : new Date()), [start]);

  const getTimerInfo = useCallback(() => {
    let milliseconds = endDate.getTime() - startDate.getTime();
    const ms = milliseconds % 1000;
    milliseconds = (milliseconds - ms) / 1000;
    const secs = milliseconds % 60;
    milliseconds = (milliseconds - secs) / 60;
    const mins = milliseconds % 60;
    const hrs = (milliseconds - mins) / 60;

    return { ms, secs, mins, hrs };
  }, [startDate, endDate]);

  const digitalTimerFormat = useMemo(() => {
    const { hrs, mins, secs } = getTimerInfo();

    const prependZero = (num: number) => (num >= 10 ? num : `0${num}`);

    return `${hrs > 0 ? hrs + ':' : ''}${prependZero(mins)}:${prependZero(secs)}`;
  }, [getTimerInfo]);

  const prettyTimerFormat = useMemo(() => {
    const timerInfo = getTimerInfo();

    if (timerInfo.hrs > 0) {
      return `${timerInfo.hrs} hrs ${timerInfo.mins} mins`;
    }

    if (timerInfo.mins > 0) {
      return `${timerInfo.mins} mins ${timerInfo.secs} secs`;
    }

    return `${timerInfo.secs} secs`;
  }, [getTimerInfo]);

  useEffect(() => {
    let intervalId: number;
    if (!end) {
      intervalId = setInterval(() => {
        setEndDate(new Date());
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [end]);

  return { digitalTimerFormat, prettyTimerFormat };
}

export default useTimer;
