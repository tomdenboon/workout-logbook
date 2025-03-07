import WlbButton from 'components/WlbButton';
import WlbModal from 'components/WlbModal';
import WlbPage, { WlbHeader } from 'components/WlbPage';
import WlbView from 'components/WlbView';
import { ThemeName, useTheme } from 'context/theme';
import { THEMES } from 'context/themes';
import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = React.useState(false);
  const { setTheme, theme } = useTheme();

  const colorSortedThemes: ThemeName[] = (
    Object.keys(THEMES) as ThemeName[]
  ).sort((a, b) => {
    return THEMES[b as keyof typeof THEMES].bg.localeCompare(
      THEMES[a as keyof typeof THEMES].bg,
    );
  });

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
          data={colorSortedThemes}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setTheme(item);
              }}
              style={{
                backgroundColor: THEMES[item].subAlt,
                padding: 12,
                margin: 4,
                marginHorizontal: 8,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: theme === item ? THEMES[item].main : 'transparent',
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: THEMES[item as keyof typeof THEMES].main,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </WlbModal>
    </WlbView>
  );
}
