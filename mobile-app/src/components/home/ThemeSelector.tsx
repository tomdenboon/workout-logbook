import WlbModal from 'components/WlbModal';
import { WlbHeader } from 'components/WlbPage';
import { ThemeName, useTheme } from 'context/theme';
import { setTheme } from 'db/mutation';
import { THEMES } from 'context/themes';
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
    <WlbModal visible={visible} close={() => setVisible(false)}>
      <WlbHeader title="Theme" />
      <FlatList
        data={colorSortedThemes}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setTheme(item)}
            style={{
              backgroundColor: THEMES[item].bg,
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
  );
}
