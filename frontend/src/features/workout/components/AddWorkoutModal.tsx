import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import { useCreateWorkoutMutation } from 'src/store/monkeylogApi';

function AddWorkoutModal() {
  const { modalControls } = useModalOutletContext();
  const [addWorkout] = useCreateWorkoutMutation();

  return (
    <ModalForm
      {...modalControls}
      initialState={{ name: '' }}
      renderOptions={[{ key: 'name', label: 'Name' }]}
      title="Add workout"
      onSubmit={(workoutCreateRequest) => addWorkout({ workoutCreateRequest }).unwrap()}
    />
  );
}

export default AddWorkoutModal;
