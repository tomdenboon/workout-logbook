import { useMemo, useState } from 'react';

function useSelectIds() {
  const [idMap, setIdMap] = useState<Record<string, boolean>>({});

  const hasSelection = useMemo(() => Object.values(idMap).some((x) => x), [idMap]);

  const toggleId = (id: number) => {
    const selectedExercise = idMap[id];
    setIdMap({
      ...idMap,
      [id]: selectedExercise ? !selectedExercise : true,
    });
  };

  return {
    idMap,
    toIdList: () => Object.keys(idMap).filter((id) => idMap[id]),
    hasSelection,
    toggleId,
  };
}

export default useSelectIds;
