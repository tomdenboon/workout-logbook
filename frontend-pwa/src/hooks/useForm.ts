import { useCallback, useEffect, useState } from 'react';

function useForm<T = unknown>(initialState: T, options?: { resetOnInitialChange?: boolean }) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (options?.resetOnInitialChange) {
      setData(initialState);
    }
  }, [initialState, options?.resetOnInitialChange]);

  function update<Key extends keyof T, Val extends T[Key]>(key: Key, value: Val) {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  const init = useCallback((newData: T) => setData(newData), []);

  function reset() {
    setData(initialState);
  }

  return { data, init, reset, update };
}

export default useForm;
