import { View, Modal, Pressable } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';

export interface ModalProps {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
}

export default function WlbModal(props: ModalProps) {
  const { visible, close, children } = props;

  const styles = useStyles();

  return (
    <Modal visible={visible} transparent={true} onRequestClose={close}>
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={close} />
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    backdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdropPressable: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modal: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: theme.bg,
      borderRadius: 8,
      overflow: 'hidden',
    },
  }));
