import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const screens = [
    {
      name: 'index',
      title: 'Home',
      icon: 'home',
    },
    {
      name: 'training',
      title: 'Training',
      icon: 'cog',
    },
  ] as const;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name={screen.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
