import { PageContainer } from '../components/Page';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';

function NavTab({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex-1 flex justify-center items-center',
          isActive ? 'text-blue-500' : 'text-gray-500',
        )
      }
    >
      {children}
    </NavLink>
  );
}

function BasePage() {
  return (
    <PageContainer>
      <Outlet />
      <div className="h-16 border-t w-full flex">
        <NavTab to="/exercises">Exercises</NavTab>
        <NavTab to="/workouts">Workouts</NavTab>
      </div>
    </PageContainer>
  );
}

export default BasePage;
