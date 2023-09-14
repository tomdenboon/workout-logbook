import AppSidebar from 'src/components/AppSidebar';
import FullWorkoutModal from 'src/pages/WorkoutPage';
import React from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <Outlet />
      <AppSidebar />
      <FullWorkoutModal />
    </>
  );
}

export default AppLayout;
