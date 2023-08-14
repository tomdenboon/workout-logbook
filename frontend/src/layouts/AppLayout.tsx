import AppSidebar from 'components/AppSidebar';
import FullWorkoutModal from 'pages/WorkoutPage';
import WorkoutContext from 'features/workout/context/WorkoutContext';
import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  const [workoutId, setWorkoutId] = useState<number>();
  const workoutContext = useMemo(
    () => ({ workoutId, setWorkoutId, closeWorkoutModal: () => setWorkoutId(undefined) }),
    [workoutId, setWorkoutId]
  );

  return (
    <WorkoutContext.Provider value={workoutContext}>
      <Outlet />
      <AppSidebar />
      <FullWorkoutModal />
    </WorkoutContext.Provider>
  );
}

export default AppLayout;
