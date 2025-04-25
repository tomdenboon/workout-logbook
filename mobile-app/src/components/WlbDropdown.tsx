import WlbText from 'components/WlbText';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, useThemedStyleSheet } from 'context/theme';
import React, { useState, ReactNode } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  Pressable,
} from 'react-native';

interface DropdownMenuProps {
  triggerComponent: (props: { onPress: () => void }) => ReactNode;
  options: {
    label: string;
    onPress: () => void;
    highlighted?: boolean;
    icon?: keyof typeof MaterialIcons.glyphMap;
  }[];
}

export default function WlbDropdown({
  triggerComponent,
  options,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = useDropdownStyles();
  const theme = useTheme();
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <View>
      {triggerComponent({ onPress: handleOpen })}
      <Modal transparent={true} visible={isOpen} onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.menu}>
              <View
                style={{
                  margin: 16,
                  borderRadius: 8,
                  gap: 2,
                  overflow: 'hidden',
                }}
              >
                {options.map((option, index) => (
                  <Pressable
                    key={option.label}
                    onPress={() => {
                      handleClose();
                      option.onPress();
                    }}
                    style={({ pressed }) => [
                      {
                        padding: 16,
                        backgroundColor: pressed ? theme.sub : theme.subAlt,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    ]}
                  >
                    {({ pressed }) => (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: 'center',
                          }}
                        >
                          {option.icon && (
                            <MaterialIcons
                              name={option.icon}
                              size={24}
                              color={pressed ? theme.bg : theme.text}
                            />
                          )}
                          <WlbText color={pressed ? 'bg' : 'text'}>
                            {option.label}
                          </WlbText>
                        </View>
                        {option.highlighted && (
                          <MaterialIcons
                            name="check"
                            size={24}
                            color={pressed ? theme.bg : theme.text}
                          />
                        )}
                      </>
                    )}
                  </Pressable>
                ))}
              </View>
            </SafeAreaView>
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
      bottom: 0,
      width: '100%',
      backgroundColor: theme.bg,
      borderRadius: 8,
      overflow: 'hidden',
    },
  }));
