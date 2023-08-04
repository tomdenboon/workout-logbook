import { useNavigate } from 'react-router-dom';
import { useCreateExerciseGroupMutation } from 'store/monkeylogApi';

function useAddExercises() {
  const navigate = useNavigate();
  const [addExerciseGroups] = useCreateExerciseGroupMutation();

  const add = (workoutId: string, exerciseIds: number[]) =>
    addExerciseGroups({
      workoutId: parseInt(workoutId, 10),
      exerciseGroupCreateRequest: {
        exerciseIds,
      },
    })
      .unwrap()
      .then(() => navigate(`/training/workouts/${workoutId}`));

  return { add };
}

export default useAddExercises;
