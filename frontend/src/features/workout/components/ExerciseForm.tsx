import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import {
  ExerciseResponse,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} from 'src/store/monkeylogApi';

function ExerciseForm() {
  const { modalControls, exercise } = useModalOutletContext<{
    exercise: ExerciseResponse | undefined;
  }>();

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();

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
          options: [],
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
