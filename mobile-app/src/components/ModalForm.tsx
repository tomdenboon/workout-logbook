import { View } from 'react-native';
import { useThemedStyleSheet } from '../context/theme';
import WlbButton from './WlbButton';
import WlbModal from './WlbModal';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import WlbInput from './WlbInput';
import WlbText from './WlbText';
import WlbHeader from './WlbPage';
import { Feather } from '@expo/vector-icons';

interface InputProps {
  type: 'text' | 'select';
  key: string;
  label: string;
  options?: {
    label: string;
    value: string;
  }[];
}

interface ModalProps {
  title: string;
  visible: boolean;
  close: () => void;
  init: any;
  inputs: InputProps[];
  onSave: (value: any) => void;
}

export default function ModalForm(props: ModalProps) {
  const { visible, close, title } = props;
  const [value, setValue] = useState(props.init);

  useEffect(() => {
    setValue(props.init);
  }, [props.init]);

  return (
    <WlbModal visible={visible} close={close}>
      <WlbHeader
        title={title}
        headerLeft={
          <WlbButton
            icon="close"
            variant="secondary"
            size="small"
            onPress={close}
          />
        }
        headerRight={
          <WlbButton
            variant="text"
            title="Save"
            onPress={() => props.onSave(value)}
          />
        }
      >
        {props.inputs.map((input) => (
          <View key={input.key}>
            <WlbText>{input.label}</WlbText>
            {input.type === 'text' ? (
              <WlbInput
                placeholder={input.label}
                value={value?.[input.key]}
                onChangeText={(text) =>
                  setValue({ ...value, [input.key]: text })
                }
              />
            ) : (
              <Picker
                selectedValue={value?.[input.key]}
                onValueChange={(v) => setValue({ ...value, [input.key]: v })}
              >
                {input.options?.map((option, idx) => (
                  <Picker.Item
                    key={idx}
                    style={{
                      color: 'white',
                    }}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            )}
          </View>
        ))}
      </WlbHeader>
    </WlbModal>
  );
}
