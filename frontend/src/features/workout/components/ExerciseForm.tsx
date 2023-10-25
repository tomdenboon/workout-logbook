import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import {
  ExerciseResponse,
  useCreateExerciseMutation,
  useGetExerciseCategoriesQuery,
  useUpdateExerciseMutation,
} from 'src/store/monkeylogApi';

function ExerciseForm() {
  const { modalControls, exercise } = useModalOutletContext<{
    exercise: ExerciseResponse | undefined;
  }>();

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const { data: exerciseCategories } = useGetExerciseCategoriesQuery();

  const initialState = {
    name: exercise?.name ?? '',
    exerciseCategory: exercise?.exerciseCategory?.id ?? '',
  } as const;

  return (
    exerciseCategories && (
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
            options: exerciseCategories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
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
    )
  );
}

export default ExerciseForm;
