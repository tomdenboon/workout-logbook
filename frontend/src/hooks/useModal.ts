import { useSearchParams } from 'react-router-dom';

export interface IUseModal {
  close: () => void;
  isOpen: boolean;
}

const useModal = <Value = unknown>(id: ModalType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const encodedValue = searchParams.get(id);
  const isOpen = !!encodedValue;
  const value = encodedValue ? JSON.parse(atob(encodedValue)) : undefined;

  const close = () => {
    searchParams.delete(id);
    setSearchParams(searchParams);
  };

  const open = (value?: Value) => {
    searchParams.set(id, btoa(JSON.stringify(value ?? {})));

    setSearchParams(searchParams);
  };

  return { open, close, isOpen, value: value as Value};
};

export default useModal;

export enum ModalType {
  Calendar = 'calendar-modal',
  Workout = 'workout-modal',
  DeleteWorkout = 'delete-workout-modal',
}