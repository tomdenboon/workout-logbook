import { useMemo, useState } from 'react';

function useSelectIds() {
  const [selectedIds, setIdList] = useState<string[]>([]);

  const hasSelection = useMemo(() => selectedIds.length > 0, [selectedIds]);

  const toggleId = (id: string) => {
    const index = selectedIds.findIndex((item) => item === id);

    if (index === -1) {
      setIdList([...selectedIds, id]);
    } else {
      setIdList(selectedIds.filter((item) => item !== id));
    }
  };

  return {
    selectedIds,
    hasSelection,
    toggleId,
    isSelected: (id: string) => selectedIds.includes(id),
    clearSelection: () => setIdList([]),
  };
}

export default useSelectIds;
