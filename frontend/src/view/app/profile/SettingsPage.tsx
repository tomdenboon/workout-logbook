import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Section from '../../../components/Section';
import AppGridContainer from '../components/AppGridContainer';
import AppHeader from '../components/AppHeader';

function Settings() {
  return (
    <AppGridContainer
      header={
        <AppHeader
          LeftTitleButton={
            <Link to="/app/profile">
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
    </AppGridContainer>
  );
}

export default Settings;
