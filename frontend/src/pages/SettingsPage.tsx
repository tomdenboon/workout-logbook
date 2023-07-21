import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import Section from 'components/Section';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Settings() {
  return (
    <AppContainer
      header={
        <AppHeader
          LeftTitleButton={
            <Link to="/profile">
              <FiArrowLeft />
            </Link>
          }
          title="Settings"
        />
      }
    >
      <Section title="Basic settings">
        <div className="grid grid-cols-1 gap-px">
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
        </div>
      </Section>
      <Section title="History" />
    </AppContainer>
  );
}

export default Settings;
