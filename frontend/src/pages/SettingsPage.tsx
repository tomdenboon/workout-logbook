import FullScreenModal from 'components/FullScreenModal';
import Section from 'components/Section';
import { IUseModal } from 'hooks/useModal';

function SettingsPage(props: IUseModal) {
  const { isOpen, close } = props;

  return (
    <FullScreenModal header={{ title: 'Settings' }} isOpen={isOpen} close={close} slideLeft>
      <Section title="Basic settings">
        <div className="grid grid-cols-1 gap-px">
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
          <div className="bg-surface p-2"> settings </div>
        </div>
      </Section>
      <Section title="History" />
    </FullScreenModal>
  );
}

export default SettingsPage;
