import { WlbHeader, WlbScreenPage } from 'components/WlbPage';
import db from 'db';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import React, { useState } from 'react';
import * as schema from 'db/schema';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useUnit } from 'context/unit';
import BarGraph from 'components/graphs/BarGraph';
import ThemeSelector from 'components/home/ThemeSelector';
import WlbButton from 'components/WlbButton';
import StatsCard from 'components/home/StatsCard';
import GraphCard from 'components/graphs/GraphCard';

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = React.useState(false);
  const { formatValueWithUnit } = useUnit();
  const { data: graphData } = useLiveQuery(
    db
      .select({
        id: schema.workouts.id,
        completedAt: schema.workouts.completedAt,
        value: sql<number>`sum(${schema.exerciseRows.reps})`,
        month: sql`strftime('%Y-%m', ${schema.workouts.completedAt} / 1000, 'unixepoch')`,
      })
      .from(schema.workouts)
      .leftJoin(
        schema.exerciseGroups,
        eq(schema.workouts.id, schema.exerciseGroups.workoutId),
      )
      .leftJoin(
        schema.exerciseRows,
        eq(schema.exerciseGroups.id, schema.exerciseRows.exerciseGroupId),
      )
      .groupBy(
        sql`strftime('%Y-%m', ${schema.workouts.completedAt} / 1000, 'unixepoch')`,
      )
      .where(and(isNotNull(schema.workouts.completedAt))),
  );

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title="Home"
          headerRight={
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <WlbButton
                size="small"
                variant="ghost"
                color="text"
                icon="palette"
                onPress={() => setThemeModalVisible(true)}
              />
              <WlbButton
                size="small"
                variant="ghost"
                color="text"
                icon="scale"
                onPress={() => router.push('/measurements')}
              />
              <WlbButton
                size="small"
                variant="ghost"
                color="text"
                icon="cog"
                onPress={() => router.push('/settings')}
              />
            </View>
          }
        />
      }
    >
      <StatsCard />
      <GraphCard
        title="General"
        data={[
          {
            label: 'Reps',
            value: 'reps',
            valueFormatter: (value) => formatValueWithUnit(value, 'reps'),
            data: graphData.map((item) => ({
              date: new Date(item.month as string).getTime(),
              value: item.value,
            })),
          },
        ]}
        GraphComponent={BarGraph}
      />

      <ThemeSelector
        visible={themeModalVisible}
        setVisible={setThemeModalVisible}
      />
    </WlbScreenPage>
  );
}
