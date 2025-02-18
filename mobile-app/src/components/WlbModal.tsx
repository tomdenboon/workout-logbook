import { View, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';

interface ModalProps {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
}

export default function WlbModal(props: ModalProps) {
  const { visible, close, children } = props;

  const styles = useStyles();

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    modal: {
      width: '90%',
      maxHeight: '80%',
      overflow: 'hidden',
      backgroundColor: theme.background,
      borderRadius: 8,
    },
  }));
