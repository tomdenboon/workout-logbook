import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import { Link } from 'react-router-dom';

function Exercise() {
  return (
    <AppContainer
      header={
        <AppHeader
          title="Exercise"
          LeftTitleButton={
            <Link to="/exercises">
              <IconButton color="inherit">
                <ArrowBack />
              </IconButton>
            </Link>
          }
        />
      }
    >
      TEXT
    </AppContainer>
  );
}

export default Exercise;
