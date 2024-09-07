import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useState } from 'react';

export default function TrainingTab() {
  const [active, setActive] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="Start a new workout"
        onPress={() => setActive(!active)}
        variant={active ? 'text' : 'primary'}
      />
      <Text>Tab Training</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
});
