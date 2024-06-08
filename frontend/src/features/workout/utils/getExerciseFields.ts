import {
  ExerciseGroupResponse,
  GetExerciseCategoriesResponse,
  ValidFields,
  ExerciseRowResponse,
} from 'src/store/baseWorkoutLogbookApi';

export default function getExerciseFields(
  exerciseGroup: ExerciseGroupResponse,
  exerciseCategories: GetExerciseCategoriesResponse
) {
  const validFields = exerciseCategories[exerciseGroup.exercise.exerciseCategory].validFields;
  return Object.keys(validFields).filter(
    (key) => validFields[key as keyof ValidFields]
  ) as (keyof Pick<ExerciseRowResponse, 'distance' | 'weight' | 'reps' | 'time'>)[];
}
