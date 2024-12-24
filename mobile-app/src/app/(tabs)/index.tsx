import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileTab() {
  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ headerTitle: 'Home' }} />
      <Text>Tab Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
