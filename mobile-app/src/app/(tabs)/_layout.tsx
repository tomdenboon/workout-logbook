import { Tabs } from 'expo-router';
import React from 'react';
import WlbTabBar from 'components/WlbTabBar';

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
