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
import WlbSelect from 'components/WlbSelect';

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
        containerStyle={{ gap: 16 }}
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
              <WlbSelect
                value={value?.[input.key]}
                onChange={(v) => setValue({ ...value, [input.key]: v })}
                options={input.options ?? []}
              />
            )}
          </View>
        ))}
      </WlbHeader>
    </WlbModal>
  );
}
