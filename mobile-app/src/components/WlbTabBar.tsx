import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from 'context/theme';
import WlbText from './WlbText';
import db from 'db';
import { workouts } from 'db/schema';
import { and, isNotNull, isNull } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import { router } from 'expo-router';
import WlbIcon, { WlbIconName } from 'components/WlbIcon';

type RouteInfo = {
  icon: WlbIconName;
  label: string;
};

type RouteMap = {
  [key: string]: RouteInfo;
};

const routeMap: RouteMap = {
  index: {
    icon: 'view-dashboard',
    label: 'Dash',
  },
  history: {
    icon: 'calendar',
    label: 'History',
  },
  workout: {
    icon: 'dumbbell',
    label: 'Workout',
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

  if (!workout) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.subAlt,
      }}
    >
      <WlbIcon name="clock" size={28} color="main" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <WlbText size={14} fontWeight="bold" color="main">
          Active workout in progress
        </WlbText>
        <WlbText size={12}>Don't forget to finish your session!</WlbText>
      </View>
      <WlbButton
        title="Resume"
        size="small"
        onPress={() => {
          router.push(`/workouts/${workout.id}`);
        }}
      />
    </View>
  );
};

const WlbTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        {
          borderTopWidth: 1,
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
              <WlbIcon
                name={icon as WlbIconName}
                size={24}
                color={isFocused ? 'main' : 'sub'}
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
