import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';
import Section from '../../../components/Section';
import { themes } from '../../../themes';
import { applyTheme } from '../../../themes/utils';
import AppGridContainer from '../components/AppGridContainer';
import Header from '../components/AppHeader';

function Settings() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  return (
    <AppGridContainer
      header={
        <Header
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
          <button
            className="bg-surface p-2 text-left"
            type="button"
            onClick={() => setIsThemeModalOpen(true)}
          >
            theme
          </button>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <Modal
            title="Select theme"
            isOpen={isThemeModalOpen}
            onClose={() => setIsThemeModalOpen(false)}
          >
            {Object.keys(themes).map((key) => (
              <button
                key="key"
                onClick={() => applyTheme(key as keyof typeof themes)}
                type="button"
                className="p-2"
              >
                {key}
              </button>
            ))}
          </Modal>
        </div>
      </Section>
      <Section title="History" />
    </AppGridContainer>
  );
}

export default Settings;
