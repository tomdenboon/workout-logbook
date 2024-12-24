import { useState } from 'react';
import { View, Button, Modal, TouchableWithoutFeedback } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';

interface ModalProps {
  visible: boolean;
  close: () => void;
  children: React.ReactNode;
}

export default function ModalForm(props: ModalProps) {
  const { visible, close } = props;

  const styles = useStyles();

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {props.children}
              <Button title="Close" onPress={close} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    container: {
      flex: 1,
      padding: 8,
      gap: 8,
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      padding: 16,
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 8,
    },
  }));
