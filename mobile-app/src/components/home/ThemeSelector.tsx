import WlbButton from 'components/WlbButton';
import { WlbModalPage, WlbHeader } from 'components/WlbPage';
import { THEMES } from 'const';
import { ThemeName, useTheme } from 'context/theme';
import { setTheme } from 'db/mutation';
import { Text, FlatList, Pressable } from 'react-native';

export default function ThemeSelector({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const { theme } = useTheme();

  const colorSortedThemes: ThemeName[] = (
    Object.keys(THEMES) as ThemeName[]
  ).sort((a, b) => {
    return THEMES[b as keyof typeof THEMES].bg.localeCompare(
      THEMES[a as keyof typeof THEMES].bg,
    );
  });

  return (
    <WlbModalPage
      visible={visible}
      close={() => setVisible(false)}
      header={<WlbHeader title="Theme" />}
      noContainer
    >
      <FlatList
        data={colorSortedThemes}
        contentContainerStyle={{ gap: 8, padding: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setTheme(item)}
            style={{
              backgroundColor: THEMES[item].bg,
              borderRadius: 8,
              borderWidth: 1,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
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
    </WlbModalPage>
  );
}
