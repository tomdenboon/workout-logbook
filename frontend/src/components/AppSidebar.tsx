import { BottomNavigationAction, Paper, BottomNavigation } from '@mui/material';
import { FiBarChart2, FiPackage, FiUser } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const NAVBAR_LIST = [
  { to: 'profile', text: 'Home', Icon: FiUser },
  { to: 'training', text: 'Workout', Icon: FiPackage },
  { to: 'statistics', text: 'Statistics', Icon: FiBarChart2 },
];

function AppSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={NAVBAR_LIST.find((obj) => location.pathname.includes(obj.to))?.to}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
      >
        {NAVBAR_LIST.map(({ to, text, Icon }) => (
          <BottomNavigationAction key={to} value={to} label={text} icon={<Icon />} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
export default AppSideBar;
