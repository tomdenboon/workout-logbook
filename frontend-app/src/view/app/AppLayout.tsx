import { Outlet } from 'react-router-dom';
import AppSideBar from './components/AppSideBar';

function AppLayout() {
  return (
    <>
      <Outlet />
      <AppSideBar />
    </>
  );
}

export default AppLayout;
