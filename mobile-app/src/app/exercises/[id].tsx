import { router, useLocalSearchParams } from 'expo-router';
import { WlbScreenPage } from 'components/WlbPage';
import * as schema from 'db/schema';
import db from 'db';
import { and, eq, isNotNull, SQL, sql } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import LineGraph from 'components/graphs/LineGraph';
import WlbCard from 'components/WlbCard';

const val = {
  oneRm: sql<number>`${schema.exerciseRows.weight} * (1 + ${schema.exerciseRows.reps} / 30.0)`,
  volume: sql<number>`${schema.exerciseRows.weight} * ${schema.exerciseRows.reps}`,
  weight: sql<number>`${schema.exerciseRows.weight}`,
  reps: sql<number>`${schema.exerciseRows.reps}`,
  time: sql<number>`${schema.exerciseRows.time}`,
  distance: sql<number>`${schema.exerciseRows.distance}`,
  pace: sql<number>`${schema.exerciseRows.distance} / ${schema.exerciseRows.time}`,
};

const agg = {
  sum: (q: SQL) => sql<number>`sum(${q})`,
  max: (q: SQL) => sql<number>`max(${q})`,
};

const exerciseTypeToAggregations = {
  reps: [
    {
      label: 'Total Reps',
      aggregation: agg.sum(val.reps),
    },
    {
      label: 'Max Reps',
      aggregation: agg.max(val.reps),
    },
  ],
  weighted: [
    {
      label: 'Max weight',
      aggregation: agg.max(val.weight),
    },
    {
      label: 'One Rep Max',
      aggregation: agg.max(val.oneRm),
    },
    {
      label: 'Max Volume',
      aggregation: agg.max(val.volume),
    },
    {
      label: 'Total Volume',
      aggregation: agg.sum(val.volume),
    },
    {
      label: 'Total Reps',
      aggregation: agg.sum(val.reps),
    },
  ],
  duration: [],
  distance: [],
};

function ExerciseGraph({
  id,
  label,
  aggregation,
}: {
  id: string;
  label: string;
  aggregation: SQL<number>;
}) {
  const { data: graphData } = useLiveQuery(
    db
      .select({
        id: schema.workouts.id,
        completedAt: schema.workouts.completedAt,
        value: aggregation,
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
      .groupBy(schema.exerciseGroups.workoutId)
      .where(
        and(
          isNotNull(schema.workouts.completedAt),
          eq(schema.exerciseGroups.exerciseId, Number(id)),
        ),
      ),
  );

  return (
    <WlbCard title={label}>
      <LineGraph
        data={graphData?.map((e) => ({
          date: e.completedAt ?? 0,
          value: e.value,
        }))}
      />
    </WlbCard>
  );
}

export default function Exercise() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: exercise } = useLiveQuery(
    db
      .select()
      .from(schema.exercises)
      .where(eq(schema.exercises.id, Number(id))),
  );

  return (
    <WlbScreenPage
      title={exercise?.[0]?.name}
      headerLeft={
        <WlbButton variant="text" title="Back" onPress={() => router.back()} />
      }
      headerRight={
        <WlbButton
          variant="text"
          title="Edit"
          onPress={() => router.push(`/schema.exercises/${id}/edit`)}
        />
      }
    >
      {exerciseTypeToAggregations[exercise?.[0]?.type]?.map((e) => (
        <ExerciseGraph
          key={e.label}
          id={id}
          label={e.label}
          aggregation={e.aggregation}
        />
      ))}
    </WlbScreenPage>
  );
}
