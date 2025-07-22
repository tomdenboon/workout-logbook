import WlbText from 'components/WlbText';
import { View } from 'react-native';

export default function WlbSection({
  title,
  children,
}: {
  title: string | React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      {typeof title === 'string' ? <WlbText>{title}</WlbText> : title}
      <View style={{ flexDirection: 'row', gap: 8 }}>{children}</View>
    </View>
  );
}
