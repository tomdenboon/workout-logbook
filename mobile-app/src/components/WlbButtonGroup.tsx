import WlbButton from 'components/WlbButton';
import { ScrollView, View } from 'react-native';

export default function WlbButtonGroup<T>({
  value,
  onChange,
  options,
  size = 'medium',
  scrollable = false,
  fullWidth = false,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  size?: 'small' | 'medium';
  scrollable?: boolean;
  fullWidth?: boolean;
}) {
  const buttons = options.map((option) => (
    <View key={option.label} style={{ flex: fullWidth ? 1 : 0 }}>
      <WlbButton
        title={option.label}
        color={value === option.value ? 'main' : 'subAlt'}
        onPress={() => onChange(option.value)}
        size={size}
      />
    </View>
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
        style={{ flexDirection: 'row', flexGrow: 0, flexShrink: 1 }}
      >
        {buttons}
      </ScrollView>
    );
  }

  return <View style={{ flexDirection: 'row', gap: 4 }}>{buttons}</View>;
}
