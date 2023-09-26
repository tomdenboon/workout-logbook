import { useEffect, useMemo, useState } from 'react';

function useTimer(start?: string, end?: string) {
  const [endDate, setEndDate] = useState(new Date());
  const startDate = useMemo(() => (start ? new Date(start) : new Date()), [start]);

  const timerInfo = useMemo(() => {
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
    const minutes = timerInfo.hrs * 60 + timerInfo.mins;
    const seconds = timerInfo.secs;

    return `${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;
  }, [timerInfo]);

  const prettyTimerFormat = useMemo(() => {
    if (timerInfo.hrs > 0) {
      return `${timerInfo.hrs} hrs ${timerInfo.mins} mins`;
    }

    if (timerInfo.mins > 0) {
      return `${timerInfo.mins} mins ${timerInfo.secs} secs`;
    }

    return `${timerInfo.secs} secs`;
  }, [timerInfo]);

  useEffect(() => {
    let intervalId: number;
    if (!end) {
      intervalId = setInterval(() => {
        setEndDate(new Date());
      }, 100);
    } else {
      setEndDate(new Date(end));
    }

    return () => clearInterval(intervalId);
  }, [end]);

  return { digitalTimerFormat, prettyTimerFormat, timerInfo };
}

export default useTimer;
