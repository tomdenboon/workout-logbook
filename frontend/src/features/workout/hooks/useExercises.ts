import { useMemo } from 'react';
import { ExerciseResponse } from 'store/baseMonkeylogApi';
import { useGetExercisesQuery } from 'store/monkeylogApi';

function useExercises() {
  const { data: exercises } = useGetExercisesQuery();

  const groupedExercises = useMemo(
    () =>
      exercises?.reduce<Record<string, ExerciseResponse[]>>(
        (grouped, exercise) => ({
          ...grouped,
          [exercise.name.toLowerCase().at(0) ?? '-']: [
            ...(grouped[exercise.name.toLowerCase().at(0) ?? '-'] ?? []),
            exercise,
          ],
        }),
        {}
      ),
    [exercises]
  );

  return { exercises, groupedExercises };
}
export default useExercises;
