import { useSearchParams } from 'react-router-dom';

export interface IUseModal {
  close: () => void;
  isOpen: boolean;
}

const useModal = (id: ModalType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const close = () => {
    searchParams.delete(id);
    setSearchParams(searchParams);
  };

  const open = (value?: string) => {
    searchParams.set(id, value ?? 'open');
    setSearchParams(searchParams);
  };

  return { open, close, isOpen: !!searchParams.get(id), value: searchParams.get(id) };
};

export default useModal;

export enum ModalType {
  DeleteWorkout = 'deleteWorkout',
  Workout = 'workoutId',
  AddWorkout = 'addWorkout',
  StartWorkout = 'StartWorkout',
  EditExercise = 'editExerciseId',
  Exercise = 'exerciseId',
  Calendar = 'calendar',
  Measurement = 'editMeasurementId',
  MeasurementPoint = 'addMeasurementPoint',
}
