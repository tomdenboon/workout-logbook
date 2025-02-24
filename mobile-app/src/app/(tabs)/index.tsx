import WlbButton from 'components/WlbButton';
import WlbModal from 'components/WlbModal';
import WlbPage, { WlbHeader } from 'components/WlbPage';
import WlbText from 'components/WlbText';
import WlbView from 'components/WlbView';
import { THEMES, useTheme } from 'context/theme';
import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text } from 'react-native';

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = React.useState(false);
  const theme = useTheme();
  console.log(theme);

  return (
    <WlbView>
      <WlbPage
        title="Home"
        headerRight={
          <WlbButton
            variant="text"
            size="small"
            icon="format-paint"
            onPress={() => setThemeModalVisible(true)}
          />
        }
      >
        <Text>Tab Home</Text>
        <Link href="/workouts/new">Open Modal</Link>
      </WlbPage>
      <WlbModal
        visible={themeModalVisible}
        close={() => setThemeModalVisible(false)}
      >
        <WlbHeader title="Theme" />
        <FlatList
          data={Object.keys(THEMES)}
          renderItem={({ item }) => (
            <Pressable onPress={() => theme.setTheme(item as any)}>
              <WlbText>{item}</WlbText>
            </Pressable>
          )}
        />
      </WlbModal>
    </WlbView>
  );
}
