import WlbCard from 'components/WlbCard';
import WlbIcon, { WlbIconName } from 'components/WlbIcon';
import WlbText from 'components/WlbText';
import React from 'react';
import { View } from 'react-native';

export default function WlbStatCard({
  icon,
  value,
  label,
}: {
  icon?: WlbIconName;
  value: string | number;
  label: string;
}) {
  return (
    <WlbCard
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      {icon && <WlbIcon name={icon} size={28} />}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <WlbText size={14} color="sub">
          {label}
        </WlbText>
        <WlbText size={14} fontWeight="bold">
          {value}
        </WlbText>
      </View>
    </WlbCard>
  );
}
