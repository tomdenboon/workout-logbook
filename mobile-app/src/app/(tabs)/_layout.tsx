import { Tabs } from 'expo-router';
import { useTheme } from '../../context/theme';
import WlbHeader from '../../components/WlbPage';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        header: () => <WlbHeader title="Workout Logbook" />,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
        },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.sub,
      }}
    />
  );
}
