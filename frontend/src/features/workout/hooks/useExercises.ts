import { useMemo } from 'react';
import { ExerciseResponse } from 'src/store/baseMonkeylogApi';
import { useGetExercisesQuery } from 'src/store/monkeylogApi';

function useExercises(search = '') {
  const { data: exercises } = useGetExercisesQuery();

  const filteredExercises = useMemo(
    () =>
      search
        ? exercises?.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
        : exercises,
    [search, exercises]
  );

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

  return { exercises, filteredExercises, groupedExercises };
}
export default useExercises;
