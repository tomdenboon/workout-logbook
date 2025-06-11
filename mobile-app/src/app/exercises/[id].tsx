import { router, useLocalSearchParams } from 'expo-router';
import { WlbScreenPage } from 'components/WlbPage';
import * as schema from 'db/schema';
import db from 'db';
import { and, eq, isNotNull, max, SQL, sql, sum } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import LineGraph from 'components/graphs/LineGraph';
import WlbCard from 'components/WlbCard';
import { useUnit } from 'context/unit';
import { AggregationFields, CALCULATION_TYPES } from 'config';

const getAggregation = (
  aggregationType: AggregationFields,
  type: 'sum' | 'max',
) => {
  const { label, field, sqlValue } = CALCULATION_TYPES[aggregationType];
  return {
    label: `${type === 'sum' ? 'Total' : 'Max'} ${label}`,
    field,
    aggregation: type === 'sum' ? sum(sqlValue) : max(sqlValue),
  };
};

const exerciseTypeToAggregations = {
  reps: [getAggregation('reps', 'sum'), getAggregation('reps', 'max')],
  weighted: [
    getAggregation('weight', 'max'),
    getAggregation('oneRm', 'max'),
    getAggregation('volume', 'max'),
    getAggregation('volume', 'sum'),
  ],
  duration: [getAggregation('time', 'sum')],
  distance: [getAggregation('distance', 'sum')],
};

function ExerciseGraph({
  id,
  label,
  aggregation,
  field,
}: {
  id: string;
  label: string;
  aggregation: SQL<string | null>;
  field: string;
}) {
  const { formatValueWithUnit } = useUnit();

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
        valueFormatter={(value) => formatValueWithUnit(value, field)}
        data={graphData?.map((e) => ({
          date: e.completedAt ?? 0,
          value: Number(e.value ?? 0),
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
        <ExerciseGraph key={e.label} id={id} {...e} />
      ))}
    </WlbScreenPage>
  );
}
