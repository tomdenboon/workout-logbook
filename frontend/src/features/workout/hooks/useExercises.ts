import { useMemo } from 'react';
import { ExerciseResponse } from 'src/store/baseWorkoutLogbookApi';
import { useGetExercisesQuery } from 'src/store/workoutLogbookApi';

function useExercises(search = '') {
  const { data: exercises } = useGetExercisesQuery();

  const getFirstLetter = (str: string) => str.toLowerCase().at(0) ?? '-';

  const groupedExercises = useMemo(
    () =>
      exercises
        ?.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()))
        ?.reduce<Record<string, ExerciseResponse[]>>(
          (grouped, exercise) => ({
            ...grouped,
            [getFirstLetter(exercise.name)]: [
              ...(grouped[getFirstLetter(exercise.name)] ?? []),
              exercise,
            ],
          }),
          {}
        ),
    [exercises, search]
  );

  return { exercises, groupedExercises };
}
export default useExercises;
