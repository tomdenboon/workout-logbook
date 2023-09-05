import { Scale, Settings } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import AppContainer from 'components/AppContainer';
import MeasurementPage from 'pages/MeasurementPage';
import SettingsPage from 'pages/SettingsPage';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  modal?: 'measurements' | 'settings';
}

function ProfilePage(props: ProfilePageProps) {
  const { modal } = props;
  const navigate = useNavigate();

  return (
    <AppContainer
      header={{
        title: 'Profile',
        rightButton: (
          <Stack direction="row">
            <IconButton onClick={() => navigate('measurements')} color="inherit">
              <Scale color="inherit" />
            </IconButton>
            <IconButton onClick={() => navigate('settings')} color="inherit">
              <Settings color="inherit" />
            </IconButton>
          </Stack>
        ),
      }}
    >
      Profile page
      <MeasurementPage isOpen={modal === 'measurements'} close={() => navigate('/profile')} />
      <SettingsPage isOpen={modal === 'settings'} close={() => navigate('/profile')} />
    </AppContainer>
  );
}

export default ProfilePage;
