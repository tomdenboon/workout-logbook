import { Scale, Settings } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import { useNavigate } from 'react-router-dom';
import { ModalOutlet } from 'src/components/ModalOutlet';

function ProfilePage() {
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
      <ModalOutlet />
    </AppContainer>
  );
}

export default ProfilePage;
