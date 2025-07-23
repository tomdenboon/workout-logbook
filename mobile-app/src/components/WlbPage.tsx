import { SafeAreaView, ScrollView, View } from 'react-native';
import WlbText from './WlbText';
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
      style={{
        backgroundColor: theme.bg,
        borderBottomWidth: 1,
        borderBottomColor: theme.subAlt,
      }}
    >
      <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
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
            <View style={{ position: 'absolute', right: 0 }}>
              {headerRight}
            </View>
          )}
        </View>
        {headerBottom && <View style={{ paddingTop: 12 }}>{headerBottom}</View>}
      </View>
    </SafeAreaView>
  );
};

export function WlbModalPage(
  props: { header: React.ReactNode } & ModalProps & { noContainer?: boolean },
) {
  return (
    <WlbModal {...props}>
      {props.header}
      {props.noContainer ? (
        props.children
      ) : (
        <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
          {props.children}
        </ScrollView>
      )}
    </WlbModal>
  );
}

export function WlbScreenPage(props: {
  header: React.ReactNode;
  children: React.ReactNode;
  noContainer?: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
      }}
    >
      {props.header}
      {props.noContainer ? (
        props.children
      ) : (
        <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
          {props.children}
        </ScrollView>
      )}
    </View>
  );
}
