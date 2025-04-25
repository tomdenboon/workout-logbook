import { router, Tabs } from 'expo-router';
import { useTheme } from '../../context/theme';
import { WlbHeader } from 'components/WlbPage';
import React from 'react';
import { View } from 'react-native';
import WlbButton from 'components/WlbButton';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { and, isNotNull, isNull } from 'drizzle-orm';
import db from 'db';
import { workouts } from 'db/schema';
import WlbTabBar from 'components/WlbTabBar';

export default function TabLayout() {
  const theme = useTheme();
  const { data: workout } = useLiveQuery(
    db.query.workouts.findFirst({
      where: and(isNotNull(workouts.startedAt), isNull(workouts.completedAt)),
    }),
  );

  return (
    <React.Fragment>
      <Tabs
        tabBar={(props) => <WlbTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      />
      {workout && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: theme.bg,
            bottom: 82,
            width: '100%',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: theme.subAlt,
            padding: 16,
          }}
        >
          <WlbButton
            variant="secondary"
            title="Resume workout"
            onPress={() => {
              router.push(`/workouts/${workout.id}`);
            }}
          />
        </View>
      )}
    </React.Fragment>
  );
}
