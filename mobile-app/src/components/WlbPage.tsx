import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import WlbText from './WlbText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import React from 'react';
import WlbModal, { ModalProps } from 'components/WlbModal';

interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerBottom?: React.ReactNode;
  title: string;
}

export const WlbHeader = ({
  headerLeft,
  headerRight,
  headerBottom,
  title,
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: theme.bg,
        borderBottomWidth: 2,
        padding: 16,
        borderBottomColor: theme.subAlt,
      }}
    >
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {headerLeft && (
          <View style={{ position: 'absolute', left: 0 }}>{headerLeft}</View>
        )}
        <WlbText fontWeight="bold">{title}</WlbText>
        {headerRight && (
          <View style={{ position: 'absolute', right: 0 }}>{headerRight}</View>
        )}
      </View>
      {headerBottom && <View style={{ paddingTop: 16 }}>{headerBottom}</View>}
    </SafeAreaView>
  );
};

export function WlbModalPage(props: HeaderProps & ModalProps) {
  return (
    <WlbModal {...props}>
      <WlbHeader {...props} />
      {props.children}
    </WlbModal>
  );
}

export function WlbScreenPage(
  props: HeaderProps & { children: React.ReactNode },
) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
      }}
    >
      <WlbHeader {...props} />
      {props.children}
    </View>
  );
}
