import { createContext } from 'react';

const WorkoutContext = createContext<{
  workoutId?: number;
  setWorkoutId: (workoutId?: number) => void;
  closeWorkoutModal: () => void;
}>({
  setWorkoutId: () => {},
  closeWorkoutModal: () => {},
});

export default WorkoutContext;
