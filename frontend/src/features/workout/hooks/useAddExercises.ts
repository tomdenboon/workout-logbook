import { useNavigate } from 'react-router-dom';
import { useCreateExerciseGroupMutation } from 'src/store/workoutLogbookApi';

function useAddExercises() {
  const navigate = useNavigate();
  const [addExerciseGroups] = useCreateExerciseGroupMutation();

  const add = (workoutId: string, exerciseIds: string[]) =>
    addExerciseGroups({
      workoutId,
      exerciseGroupCreateRequest: {
        exerciseIds,
      },
    })
      .unwrap()
      .then(() => {
        navigate('..');
      });

  return { add };
}

export default useAddExercises;
