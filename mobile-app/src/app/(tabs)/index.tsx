import { Link, Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WlbView from '../../components/WlbView';
import WlbHeader from '../../components/WlbPage';
import WlbPage from '../../components/WlbPage';

export default function ProfileTab() {
  return (
    <WlbView>
      <WlbPage title="Home">
        <Text>Tab Home</Text>
        <Link href="/workouts/new">Open Modal</Link>
      </WlbPage>
    </WlbView>
  );
}
