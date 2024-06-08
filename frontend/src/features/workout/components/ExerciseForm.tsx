import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import {
  ExerciseResponse,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} from 'src/store/workoutLogbookApi';

function ExerciseForm() {
  const { modalControls, exercise } = useModalOutletContext<{
    exercise: ExerciseResponse | undefined;
  }>();

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const exerciseCategoryOptions = [
    { value: 'WEIGHTED', label: 'Weighted' },
    { value: 'REPS', label: 'Reps' },
    { value: 'DURATION', label: 'Duration' },
    { value: 'DISTANCE', label: 'Distance' },
  ];

  const initialState = {
    name: exercise?.name ?? '',
    exerciseCategory: exercise?.exerciseCategory ?? '',
  } as const;

  return (
    <ModalForm
      title={exercise ? 'Edit Exercise' : 'Create Exercise'}
      initialState={initialState}
      renderOptions={[
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'exerciseCategory',
          label: 'Category',
          disabled: !!exercise,
          options: exerciseCategoryOptions,
        },
      ]}
      onSubmit={(exerciseForm) => {
        const { name, exerciseCategory } = exerciseForm;

        if (!exerciseCategory) {
          return;
        }

        return (
          exercise
            ? updateExercise({ id: exercise.id, exerciseUpdateRequest: { name } })
            : addExercise({ exerciseCreateRequest: { name, exerciseCategory } })
        ).unwrap();
      }}
      {...modalControls}
    />
  );
}

export default ExerciseForm;
