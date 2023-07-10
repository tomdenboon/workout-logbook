import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AppGridContainer from '../components/AppGridContainer';
import AppHeader from '../components/AppHeader';

function Exercise() {
  return (
    <AppGridContainer
      header={
        <AppHeader
          title="Exercise"
          LeftTitleButton={
            <Link to="/app/exercises">
              <IconButton color="inherit">
                <ArrowBack />
              </IconButton>
            </Link>
          }
        />
      }
    >
      TEXT
    </AppGridContainer>
  );
}

export default Exercise;
