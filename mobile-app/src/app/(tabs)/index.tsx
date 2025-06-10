import BarGraph from 'components/graphs/BarGraph';
import ThemeSelector from 'components/home/ThemeSelector';
import WlbButton from 'components/WlbButton';
import WlbCard from 'components/WlbCard';
import { WlbScreenPage } from 'components/WlbPage';
import WlbSelect from 'components/WlbSelect';
import db from 'db';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import React, { useState } from 'react';
import * as schema from 'db/schema';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useUnit } from 'context/unit';

export default function ProfileTab() {
  const [themeModalVisible, setThemeModalVisible] = React.useState(false);
  const [period, setPeriod] = useState<'3months' | '1year' | ''>('');
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
      title="Home"
      headerRight={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <WlbButton
            variant="text"
            size="small"
            icon="settings"
            onPress={() => router.push('/settings')}
          />
          <WlbButton
            variant="text"
            size="small"
            icon="palette"
            onPress={() => setThemeModalVisible(true)}
          />
        </View>
      }
    >
      <View style={{ padding: 16 }}>
        <WlbCard
          title="General"
          titleRight={
            <WlbSelect
              options={
                [
                  { label: '3 months', value: '3months' },
                  { label: '1 year', value: '1year' },
                  { label: 'All time', value: '' },
                ] as const
              }
              size="small"
              value={period}
              onChange={(value) => setPeriod(value)}
            />
          }
        >
          <BarGraph
            period={period}
            valueFormatter={(value) => formatValueWithUnit(value, 'reps')}
            data={graphData.map((item) => ({
              date: new Date(item.month as string).getTime(),
              value: item.value,
            }))}
          />
        </WlbCard>
      </View>
      <ThemeSelector
        visible={themeModalVisible}
        setVisible={setThemeModalVisible}
      />
    </WlbScreenPage>
  );
}
