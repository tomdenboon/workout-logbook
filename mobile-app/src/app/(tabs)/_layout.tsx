import WlbTabBar from 'components/WlbTabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <WlbTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
