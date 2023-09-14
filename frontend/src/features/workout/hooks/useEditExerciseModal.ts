import useModal, { ModalType } from 'src/hooks/useModal';
import { useState } from 'react';
import { ExerciseResponse } from 'src/store/baseMonkeylogApi';

function useEditExerciseModal() {
  const { open, isOpen, close } = useModal(ModalType.EditExercise);
  const [editExercise, setEditExercise] = useState<ExerciseResponse>();

  const openEmpty = () => {
    setEditExercise(undefined);
    open();
  };

  const openWithExercise = (exercise: ExerciseResponse) => {
    setEditExercise(exercise);
    open();
  };

  return { isOpen, openEmpty, openWithExercise, close, editExercise };
}

export default useEditExerciseModal;
