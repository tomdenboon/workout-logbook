import WlbButton, { WlbButtonProps } from 'components/WlbButton';
import WlbText from 'components/WlbText';
import { useThemedStyleSheet } from 'context/theme';
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

interface DropdownMenuProps {
  triggerProps: Omit<WlbButtonProps, 'onPress'>;
  options: { label: string; onPress: () => void }[];
  dropdownWidth?: number;
  align?: 'left' | 'right';
}

export default function WlbDropdown({
  triggerProps,
  options,
  dropdownWidth = 150,
  align = 'left',
}: DropdownMenuProps) {
  const triggerRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const styles = useDropdownStyles();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (triggerRef.current && isOpen) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px + (align === 'left' ? width - dropdownWidth : 0),
          y: py + height + 4,
        });
      });
    }
  }, [isOpen]);

  return (
    <View>
      <View ref={triggerRef}>
        <WlbButton onPress={handleOpen} {...triggerProps} />
      </View>
      <Modal
        transparent={true}
        visible={isOpen && !!position}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.menu,
                {
                  top: position?.y,
                  left: position?.x,
                  width: dropdownWidth,
                },
              ]}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  onPress={() => {
                    option.onPress();
                    handleClose();
                  }}
                  style={styles.menuOption}
                >
                  <WlbText>{option.label}</WlbText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const useDropdownStyles = () =>
  useThemedStyleSheet((theme) => ({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
      position: 'absolute',
      width: 80,
      backgroundColor: theme.background,
      borderRadius: 5,
      padding: 10,
    },
    menuOption: {
      padding: 5,
    },
  }));
