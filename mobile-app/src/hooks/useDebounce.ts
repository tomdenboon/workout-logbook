import { useEffect } from 'react';

export default function useDebounce(fn: () => void, delay: number = 500) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      fn();
    }, delay);

    return () => clearTimeout(timeout);
  }, [fn, delay]);
}
