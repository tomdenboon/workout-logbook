import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import WlbText from './WlbText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import React from 'react';

export default function WlbPage({
  headerLeft,
  headerRight,
  headerBottom,
  title,
  children,
  containerStyle,
}: {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  headerBottom?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <SafeAreaView
        edges={['top']}
        style={{
          backgroundColor: theme.background,
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
            <View style={{ position: 'absolute', right: 0 }}>
              {headerRight}
            </View>
          )}
        </View>
        {headerBottom && <View style={{ paddingTop: 16 }}>{headerBottom}</View>}
      </SafeAreaView>
      <ScrollView>
        <View style={[{ padding: 16 }, containerStyle]}>{children}</View>
      </ScrollView>
    </React.Fragment>
  );
}
