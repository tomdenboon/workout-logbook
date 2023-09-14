import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import { Link } from 'react-router-dom';

function Exercise() {
  return (
    <AppContainer
      header={{
        title: 'Exercise',
        leftButton: (
          <Link to="/exercises">
            <IconButton color="inherit">
              <ArrowBack />
            </IconButton>
          </Link>
        ),
      }}
    >
      TEXT
    </AppContainer>
  );
}

export default Exercise;
