import AppSidebar from 'src/components/AppSidebar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <Outlet />
      <AppSidebar />
    </>
  );
}

export default AppLayout;
