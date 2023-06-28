import { Outlet } from 'react-router-dom';
import AppSideBar from './components/AppSideBar';

function AppPage() {
  return (
    <>
      <Outlet />
      <AppSideBar />
    </>
  );
}

export default AppPage;
