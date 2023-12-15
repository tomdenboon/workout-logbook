import FullScreenModal from 'src/components/FullScreenModal';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import Section from 'src/components/Section';

function SettingsPage() {
  const { modalControls } = useModalOutletContext();

  return (
    <FullScreenModal header={{ title: 'Settings' }} {...modalControls}>
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
