import { useCallback, useState } from 'react';

function useForm<T = unknown>(initialState: T) {
  const [data, setData] = useState(initialState);

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
