import { View } from 'react-native';
import WlbButton from './WlbButton';
import WlbModal from './WlbModal';
import React, { useEffect, useState } from 'react';
import WlbInput from './WlbInput';
import WlbText from './WlbText';
import WlbSelect from 'components/WlbSelect';
import { WlbModalPage, WlbHeader } from 'components/WlbPage';

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
    <WlbModalPage
      visible={visible}
      close={close}
      header={
        <WlbHeader
          title={title}
          headerLeft={
            <WlbButton
              icon="close"
              color="subAlt"
              size="small"
              onPress={close}
            />
          }
          headerRight={
            <WlbButton
              color="text"
              title="Save"
              onPress={() => props.onSave(value)}
            />
          }
        />
      }
    >
      {props.inputs.map((input) => (
        <View
          key={input.key}
          style={{
            gap: 8,
          }}
        >
          <WlbText>{input.label}</WlbText>
          {input.type === 'text' ? (
            <WlbInput
              placeholder={input.label}
              value={value?.[input.key]}
              onChangeText={(text) => setValue({ ...value, [input.key]: text })}
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
    </WlbModalPage>
  );
}
