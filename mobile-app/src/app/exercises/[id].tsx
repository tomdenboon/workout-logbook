import { router, useLocalSearchParams } from 'expo-router';
import { WlbScreenPage, WlbHeader } from 'components/WlbPage';
import * as schema from 'db/schema';
import db from 'db';
import { and, desc, eq, isNotNull, max, SQL, sql, sum } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import LineGraph from 'components/graphs/LineGraph';
import { useUnit } from 'context/unit';
import { AggregationFields, CALCULATION_TYPES } from 'const';
import GraphCard from 'components/graphs/GraphCard';
import WlbText from 'components/WlbText';
import { toMap } from 'utils/array';
import WlbCard from 'components/WlbCard';
import { FlatList, View } from 'react-native';

const getAggregation = (
  aggregationType: AggregationFields,
  type: 'sum' | 'max',
) => {
  const { field, sqlValue, label } = CALCULATION_TYPES[aggregationType];
  return {
    id: type + aggregationType,
    field,
    label: (type === 'sum' ? 'Total' : 'Best') + ' ' + label,
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

export default function Exercise() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: exercise } = useLiveQuery(
    db.query.exercises.findFirst({
      where: (exercises, { eq }) => eq(exercises.id, Number(id)),
    }),
  );

  const { data: workouts } = useLiveQuery(
    db.query.workouts.findMany({
      where: isNotNull(schema.workouts.completedAt),
      orderBy: desc(schema.workouts.completedAt),
      with: {
        exerciseGroups: {
          where: eq(schema.exerciseGroups.exerciseId, Number(id)),
          with: {
            exercise: true,
            exerciseRows: true,
          },
        },
      },
    }),
  );

  console.log(
    workouts.map((w) => w.exerciseGroups.map((e) => e.exercise.name)),
  );

  const aggregations = exercise
    ? exerciseTypeToAggregations[exercise.type]
    : [];
  const { formatValueWithUnit } = useUnit();

  const { data: graphData } = useLiveQuery(
    db
      .select({
        id: schema.workouts.id,
        completedAt: schema.workouts.completedAt,
        ...toMap(aggregations, (a) => [a.id, a.aggregation]),
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
    [id, exercise],
  );

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title={exercise?.name ?? ''}
          headerLeft={
            <WlbButton
              color="text"
              title="Back"
              onPress={() => router.back()}
            />
          }
          headerRight={
            <WlbButton
              color="text"
              title="Edit"
              onPress={() => router.push(`/schema.exercises/${id}/edit`)}
            />
          }
        />
      }
    >
      {exercise && (
        <GraphCard
          title={exercise.name}
          data={aggregations.map((e) => ({
            label: e.label,
            value: e.id,
            valueFormatter: (value) => formatValueWithUnit(value, e.field),
            data: graphData?.map((d) => ({
              date: d.completedAt ?? 0,
              value: Number(d[e.id as keyof typeof d] ?? 0),
            })),
          }))}
          GraphComponent={LineGraph}
        />
      )}

      <FlatList
        data={workouts.filter((w) => w.exerciseGroups.length)}
        contentContainerStyle={{ gap: 12 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <WlbCard key={item.id} title={item.name}>
            {item.exerciseGroups.map((e) => (
              <WlbText key={e.id}>{e.exercise.name}</WlbText>
            ))}
          </WlbCard>
        )}
      />
    </WlbScreenPage>
  );
}
