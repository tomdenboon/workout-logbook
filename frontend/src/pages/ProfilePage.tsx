import { Scale, Settings } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <AppContainer
      header={
        <AppHeader
          title="Profile"
          RightButton={
            <Stack direction="row">
              <IconButton onClick={() => navigate('settings')} color="inherit">
                <Settings color="inherit" />
              </IconButton>
              <IconButton onClick={() => navigate('/measurements')} color="inherit">
                <Scale color="inherit" />
              </IconButton>
            </Stack>
          }
        />
      }
    >
      Profile page
    </AppContainer>
  );
}

export default ProfilePage;
