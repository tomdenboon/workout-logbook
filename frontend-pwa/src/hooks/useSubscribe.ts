import { Observable } from '@nozbe/watermelondb/utils/rx';
import { useEffect, useState } from 'react';

function useSubscribe<T>(observable: Observable<T> | undefined) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    observable?.subscribe((m) => {
      setData(m);
    });
  }, [observable]);

  return data;
}

export default useSubscribe;
