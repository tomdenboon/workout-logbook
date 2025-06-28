import React from 'react';
import { View } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { and, count, eq, isNotNull, sql } from 'drizzle-orm';
import db from 'db';
import { workouts, exerciseGroups, exerciseRows, exercises } from 'db/schema';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { useUnit } from 'context/unit';
import { formatTime } from 'hooks/useTimer';
import { CALCULATION_TYPES } from 'const';
import WlbStatCard from 'components/WlbStatCard';

export default function StatsCard() {
  const { convertToDisplayUnit, weightUnit } = useUnit();

  const { data: totalWorkouts } = useLiveQuery(
    db
      .select({
        count: count(),
        milliseconds: sql<number>`sum((${workouts.completedAt} - ${workouts.startedAt}))`,
      })
      .from(workouts)
      .where(isNotNull(workouts.completedAt)),
  );

  const { data: totalWeight } = useLiveQuery(
    db
      .select({
        totalWeight: sql<number>`sum(${CALCULATION_TYPES.volume.sqlValue})`,
      })
      .from(workouts)
      .leftJoin(exerciseGroups, eq(workouts.id, exerciseGroups.workoutId))
      .leftJoin(
        exerciseRows,
        eq(exerciseGroups.id, exerciseRows.exerciseGroupId),
      )
      .leftJoin(exercises, eq(exerciseGroups.exerciseId, exercises.id))
      .where(
        and(
          isNotNull(workouts.completedAt),
          isNotNull(exerciseRows.weight),
          isNotNull(exerciseRows.reps),
          eq(exercises.type, 'weighted'),
        ),
      ),
  );

  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 8 }}
    >
      <WlbStatCard value={totalWorkouts?.[0]?.count} label="Workouts" />
      <WlbStatCard
        value={formatTime(totalWorkouts?.[0]?.milliseconds, 'digital')}
        label="Time"
      />
      <WlbStatCard
        value={convertToDisplayUnit(
          totalWeight?.[0]?.totalWeight ?? 0,
          'weight',
        )}
        label={`Lifted (${weightUnit})`}
      />
    </View>
  );
}
