import WlbText from 'components/WlbText';
import { useTimer, formatTime } from 'hooks/useTimer';
import { View } from 'react-native';

export default function WlbTimer({
  start,
  end,
}: {
  start: number | null;
  end?: number | null;
}) {
  const timer = useTimer(start, end);

  return timer && <WlbText>{formatTime(timer, 'pretty')}</WlbText>;
}
