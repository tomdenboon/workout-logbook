import React from 'react';
import { View } from 'react-native';
import WlbText from './WlbText';
import WlbIcon, { WlbIconName } from './WlbIcon';
import WlbCard from 'components/WlbCard';

interface WlbEmptyStateProps {
  icon?: WlbIconName;
  description: string;
  onPress: () => void;
}

export default function WlbEmptyState({
  description,
  onPress,
  icon = 'plus',
}: WlbEmptyStateProps) {
  return (
    <WlbCard
      style={{
        borderStyle: 'dashed',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        {icon && <WlbIcon name={icon} size={32} color="main" />}
        <WlbText color="main">{description}</WlbText>
      </View>
    </WlbCard>
  );
}
