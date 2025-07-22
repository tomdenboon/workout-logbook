import React from 'react';
import { View } from 'react-native';
import WlbIcon from 'components/WlbIcon';
import WlbText from 'components/WlbText';
import { formatTime } from 'hooks/useTimer';
import { useUnit } from 'context/unit';

interface WorkoutStatsRowProps {
  startedAt: number | null;
  completedAt: number | null;
  totalVolume: number;
  prCount: number;
}

export default function WorkoutStatsRow({
  startedAt,
  completedAt,
  totalVolume,
  prCount,
}: WorkoutStatsRowProps) {
  const { formatValueWithUnit } = useUnit();

  const totalVolumeFormatted = formatValueWithUnit(totalVolume, 'weight');

  const items = [
    {
      icon: 'clock-outline',
      value: formatTime((completedAt ?? 0) - (startedAt ?? 0), 'digital'),
    },
    {
      icon: 'weight',
      value: totalVolume > 0 ? totalVolumeFormatted : '0',
    },
    {
      icon: 'trophy',
      value: prCount,
    },
  ] as const;

  return (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      {items.map((item) => (
        <View
          key={item.icon}
          style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}
        >
          <WlbIcon name={item.icon} size={20} />
          <WlbText>{item.value}</WlbText>
        </View>
      ))}
    </View>
  );
}
