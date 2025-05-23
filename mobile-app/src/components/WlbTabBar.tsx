import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from 'context/theme';
import WlbText from './WlbText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import db from 'db';
import { workouts } from 'db/schema';
import { and, isNotNull, isNull } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import { router } from 'expo-router';

type RouteInfo = {
  icon: string;
  label: string;
};

type RouteMap = {
  [key: string]: RouteInfo;
};

const routeMap: RouteMap = {
  index: {
    icon: 'home',
    label: 'Home',
  },
  history: {
    icon: 'calendar',
    label: 'History',
  },
  training: {
    icon: 'dumbbell',
    label: 'Workouts',
  },
  exercises: {
    icon: 'clipboard-list',
    label: 'Exercises',
  },
  measurements: {
    icon: 'scale',
    label: 'Measurements',
  },
};

const ActiveWorkout = () => {
  const theme = useTheme();
  const { data: workout } = useLiveQuery(
    db.query.workouts.findFirst({
      where: and(isNotNull(workouts.startedAt), isNull(workouts.completedAt)),
    }),
  );

  return workout ? (
    <View
      style={{
        backgroundColor: theme.bg,
        borderBottomWidth: 2,
        borderColor: theme.subAlt,
        padding: 16,
      }}
    >
      <WlbButton
        variant="primary"
        title="Resume workout"
        onPress={() => {
          router.push(`/workouts/${workout.id}`);
        }}
      />
    </View>
  ) : null;
};

const WlbTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        {
          borderTopWidth: 2,
          backgroundColor: theme.bg,
          borderTopColor: theme.subAlt,
        },
      ]}
    >
      <ActiveWorkout />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { icon, label } = routeMap[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              <MaterialCommunityIcons
                name={icon as any}
                size={24}
                color={isFocused ? theme.main : theme.sub}
              />
              <WlbText size={12} color={isFocused ? 'main' : 'sub'}>
                {label}
              </WlbText>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default WlbTabBar;
