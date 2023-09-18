import { Scale, Settings } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import MeasurementPage from 'src/pages/MeasurementPage';
import SettingsPage from 'src/pages/SettingsPage';
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
      Work in progressss
      <SettingsPage isOpen={modal === 'settings'} close={() => navigate('/profile')} />
      <MeasurementPage isOpen={modal === 'measurements'} close={() => navigate('/profile')} />
    </AppContainer>
  );
}

export default ProfilePage;
