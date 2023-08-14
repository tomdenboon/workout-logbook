import { Scale, Settings } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import AppContainer from 'components/AppContainer';
import FullScreenMeasurementModal from 'features/measurement/components/FullScreenMeasurementModal';
import useModal from 'hooks/useModal';
import SettingsPage from 'pages/SettingsPage';

function ProfilePage() {
  const measurementModal = useModal();
  const settingsModal = useModal();

  return (
    <AppContainer
      header={{
        title: 'Profile',
        rightButton: (
          <Stack direction="row">
            <IconButton onClick={measurementModal.open} color="inherit">
              <Scale color="inherit" />
            </IconButton>
            <IconButton onClick={settingsModal.open} color="inherit">
              <Settings color="inherit" />
            </IconButton>
          </Stack>
        ),
      }}
    >
      Profile page
      <FullScreenMeasurementModal {...measurementModal} />
      <SettingsPage {...settingsModal} />
    </AppContainer>
  );
}

export default ProfilePage;
