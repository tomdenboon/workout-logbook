import { useState } from 'react';

function useForm<T extends object>(initialState: T) {
  const [data, setData] = useState(initialState);

  function update<Key extends keyof T, Val extends T[Key]>(key: Key, value: Val) {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  function init(newData: T) {
    setData(newData);
  }

  function reset() {
    setData(initialState);
  }

  return { data, init, reset, update };
}

export default useForm;
