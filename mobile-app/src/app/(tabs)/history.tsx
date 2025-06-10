import React, { useState } from 'react';
import { WlbModalPage, WlbScreenPage } from 'components/WlbPage';
import { SectionList, View, ScrollView } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { desc, isNotNull, eq, and, lt, max, sql, asc } from 'drizzle-orm';
import * as schema from 'db/schema';
import groupBy from 'groupBy';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout } from 'db/mutation';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import WlbTimer from 'components/WlbTimer';
import { ExerciseRow } from 'db/types';
import { ExerciseCategory, VALID_FIELDS } from 't';
import { useUnit } from 'context/unit';

function WorkoutCard({
  workoutId,
  completedAt,
}: {
  workoutId: number;
  completedAt: number | null;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const { data: workoutDetails } = useLiveQuery(
    db.query.workouts.findFirst({
      where: eq(schema.workouts.id, workoutId),
      with: {
        exerciseGroups: {
          with: {
            exercise: true,
            exerciseRows: true,
          },
        },
      },
    }),
  );

  const { formatValueWithUnit } = useUnit();

  function exerciseRowToText(
    exerciseCategory: ExerciseCategory,
    row: ExerciseRow,
  ) {
    const fields = VALID_FIELDS[exerciseCategory];

    const formattedFields = fields.map((field) =>
      formatValueWithUnit(row[field] ?? 0, field),
    );

    const joiner = exerciseCategory === 'weighted' ? ' x ' : ' in ';

    return formattedFields.join(joiner);
  }

  const { data: historicalPRs } = useLiveQuery(
    db
      .select({
        exerciseId: schema.exerciseGroups.exerciseId,
        exerciseType: schema.exercises.type,
        maxWeight: max(schema.exerciseRows.weight),
        maxReps: max(schema.exerciseRows.reps),
        maxOneRM: max(
          sql<number>`${schema.exerciseRows.weight} * (1 + ${schema.exerciseRows.reps} / 30.0)`,
        ),
        maxVolume: max(
          sql<number>`${schema.exerciseRows.weight} * ${schema.exerciseRows.reps}`,
        ),
        maxTime: max(schema.exerciseRows.time),
        maxDistance: max(schema.exerciseRows.distance),
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
      .leftJoin(
        schema.exercises,
        eq(schema.exerciseGroups.exerciseId, schema.exercises.id),
      )
      .where(
        and(
          isNotNull(schema.workouts.completedAt),
          lt(schema.workouts.completedAt, completedAt ?? 0),
          isNotNull(schema.exerciseRows.id),
        ),
      )
      .groupBy(schema.exerciseGroups.exerciseId, schema.exercises.type),
    [completedAt],
  );

  const calculatePRs = (exerciseGroups: any[]) => {
    const prs: {
      exerciseRowId: number;
      badgeType: string;
    }[] = [];

    exerciseGroups.forEach((group) => {
      const exerciseId = group.exercise.id;
      const exerciseType = group.exercise.type;

      // Find historical PR for this exercise
      const historicalPR = historicalPRs.find(
        (pr) => pr.exerciseId === exerciseId,
      );

      if (exerciseType === 'weighted') {
        // Find the row with max weight
        const maxWeightRow = group.exerciseRows.reduce(
          (max: any, row: any) =>
            (row.weight || 0) > (max.weight || 0) ? row : max,
          group.exerciseRows[0],
        );
        const currentMaxWeight = maxWeightRow?.weight || 0;

        // Find the row with max 1RM
        const maxOneRMRow = group.exerciseRows.reduce((max: any, row: any) => {
          const currentOneRM =
            row.weight && row.reps ? row.weight * (1 + row.reps / 30.0) : 0;
          const maxOneRM =
            max.weight && max.reps ? max.weight * (1 + max.reps / 30.0) : 0;
          return currentOneRM > maxOneRM ? row : max;
        }, group.exerciseRows[0]);
        const currentMaxOneRM =
          maxOneRMRow?.weight && maxOneRMRow?.reps
            ? maxOneRMRow.weight * (1 + maxOneRMRow.reps / 30.0)
            : 0;

        // Find the row with max volume
        const maxVolumeRow = group.exerciseRows.reduce((max: any, row: any) => {
          const currentVolume =
            row.weight && row.reps ? row.weight * row.reps : 0;
          const maxVolume = max.weight && max.reps ? max.weight * max.reps : 0;
          return currentVolume > maxVolume ? row : max;
        }, group.exerciseRows[0]);
        const currentMaxVolume =
          maxVolumeRow?.weight && maxVolumeRow?.reps
            ? maxVolumeRow.weight * maxVolumeRow.reps
            : 0;

        // Check for Weight PR
        if (
          currentMaxWeight > 0 &&
          (!historicalPR?.maxWeight ||
            currentMaxWeight > Number(historicalPR.maxWeight))
        ) {
          prs.push({
            exerciseRowId: maxWeightRow.id,
            badgeType: 'Weight',
          });
        }

        // Check for One Rep Max PR
        if (
          currentMaxOneRM > 0 &&
          (!historicalPR?.maxOneRM ||
            currentMaxOneRM > Number(historicalPR.maxOneRM))
        ) {
          prs.push({
            exerciseRowId: maxOneRMRow.id,
            badgeType: '1RM',
          });
        }

        // Check for Volume PR
        if (
          currentMaxVolume > 0 &&
          (!historicalPR?.maxVolume ||
            currentMaxVolume > Number(historicalPR.maxVolume))
        ) {
          prs.push({
            exerciseRowId: maxVolumeRow.id,
            badgeType: 'Volume',
          });
        }
      } else if (exerciseType === 'reps') {
        const maxRepsRow = group.exerciseRows.reduce(
          (max: any, row: any) =>
            (row.reps || 0) > (max.reps || 0) ? row : max,
          group.exerciseRows[0],
        );
        const currentMaxReps = maxRepsRow?.reps || 0;

        if (
          currentMaxReps > 0 &&
          (!historicalPR?.maxReps ||
            currentMaxReps > Number(historicalPR.maxReps))
        ) {
          prs.push({
            exerciseRowId: maxRepsRow.id,
            badgeType: 'Reps',
          });
        }
      } else if (exerciseType === 'duration') {
        const maxTimeRow = group.exerciseRows.reduce(
          (max: any, row: any) =>
            (row.time || 0) > (max.time || 0) ? row : max,
          group.exerciseRows[0],
        );
        const currentMaxTime = maxTimeRow?.time || 0;

        if (
          currentMaxTime > 0 &&
          (!historicalPR?.maxTime ||
            currentMaxTime > Number(historicalPR.maxTime))
        ) {
          prs.push({
            exerciseRowId: maxTimeRow.id,
            badgeType: 'Time',
          });
        }
      } else if (exerciseType === 'distance') {
        const maxDistanceRow = group.exerciseRows.reduce(
          (max: any, row: any) =>
            (row.distance || 0) > (max.distance || 0) ? row : max,
          group.exerciseRows[0],
        );
        const currentMaxDistance = maxDistanceRow?.distance || 0;

        if (
          currentMaxDistance > 0 &&
          (!historicalPR?.maxDistance ||
            currentMaxDistance > Number(historicalPR.maxDistance))
        ) {
          prs.push({
            exerciseRowId: maxDistanceRow.id,
            badgeType: 'Distance',
          });
        }
      }
    });

    return prs;
  };

  const calculateTotalVolume = (exerciseGroups: any[]) => {
    return exerciseGroups.reduce((total, group) => {
      if (group.exercise.type === 'weighted') {
        const groupVolume = group.exerciseRows.reduce(
          (sum: number, row: any) => {
            if (row.weight && row.reps) {
              return sum + row.weight * row.reps;
            }
            return sum;
          },
          0,
        );
        return total + groupVolume;
      }
      return total;
    }, 0);
  };

  if (!workoutDetails || !historicalPRs) {
    return (
      <WlbCard title="Loading...">
        <WlbText>Loading...</WlbText>
      </WlbCard>
    );
  }

  const totalVolume = calculateTotalVolume(workoutDetails.exerciseGroups);
  const totalVolumeFormatted = formatValueWithUnit(totalVolume, 'weight');
  const prs = calculatePRs(workoutDetails.exerciseGroups);
  const completedDate = new Date(workoutDetails.completedAt as number);
  const currentYear = new Date().getFullYear();
  const isCurrentYear = completedDate.getFullYear() === currentYear;

  const formatDate = () => {
    return completedDate.toLocaleTimeString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: isCurrentYear ? undefined : 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      <WlbCard
        title={workoutDetails.name}
        onPress={() => setShowDetails(true)}
        titleRight={
          <WlbDropdown
            triggerComponent={({ onPress }) => (
              <WlbButton
                onPress={onPress}
                variant="primary"
                size="small"
                icon="keyboard-control"
              />
            )}
            options={[
              {
                label: 'Edit',
                onPress: () => router.push(`/workouts/${workoutId}`),
              },
              {
                label: 'Delete',
                onPress: () => deleteWorkout(workoutId),
              },
            ]}
          />
        }
      >
        <View style={{ gap: 8 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <WlbText color="sub">{formatDate()}</WlbText>
            {workoutDetails.startedAt && (
              <WlbTimer
                start={workoutDetails.startedAt}
                end={workoutDetails.completedAt}
              />
            )}
          </View>

          {totalVolume > 0 && <WlbText>V: {totalVolumeFormatted}</WlbText>}

          {prs.length > 0 && (
            <WlbText color="main" fontWeight="bold">
              P: {prs.length} Prs
            </WlbText>
          )}

          <View style={{ gap: 8 }}>
            {workoutDetails.exerciseGroups.map((group) => (
              <View
                key={group.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <WlbText>{group.exercise.name}</WlbText>
                <WlbText color="sub">{group.exerciseRows.length} sets</WlbText>
              </View>
            ))}
          </View>
        </View>
      </WlbCard>

      <WlbModalPage
        visible={showDetails}
        close={() => setShowDetails(false)}
        headerLeft={
          <WlbButton
            variant="secondary"
            icon="close"
            size="small"
            onPress={() => setShowDetails(false)}
          />
        }
        headerBottom={
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <WlbText color="sub">{formatDate()}</WlbText>
              {workoutDetails.startedAt && (
                <WlbTimer
                  start={workoutDetails.startedAt}
                  end={workoutDetails.completedAt}
                />
              )}
            </View>

            {totalVolume > 0 && (
              <WlbText>Total Volume: {totalVolumeFormatted}</WlbText>
            )}
          </View>
        }
        title={workoutDetails.name}
      >
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
          {workoutDetails.exerciseGroups.map((group) => (
            <View key={group.id} style={{ gap: 8 }}>
              <WlbText fontWeight="bold">{group.exercise.name}</WlbText>
              <View style={{ gap: 4 }}>
                {group.exerciseRows.map((row, index) => {
                  const rowPRs = prs.filter(
                    (pr) => pr.exerciseRowId === row.id,
                  );
                  return (
                    <View key={row.id} style={{ gap: 4 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <WlbText color="sub">Set {index + 1}</WlbText>
                        <WlbText>
                          {exerciseRowToText(group.exercise.type, row)}
                        </WlbText>
                      </View>
                      {rowPRs.length > 0 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                            justifyContent: 'flex-end',
                          }}
                        >
                          {rowPRs.map((pr, prIndex) => (
                            <WlbText size={14}>🏆 {pr.badgeType}</WlbText>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </WlbModalPage>
    </>
  );
}

export default function History() {
  const workouts = useLiveQuery(
    db.query.workouts.findMany({
      where: isNotNull(schema.workouts.completedAt),
      orderBy: desc(schema.workouts.completedAt),
    }),
  );

  const groupedWorkouts = groupBy(workouts?.data ?? [], (workout) =>
    new Date(workout.completedAt as number).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
  );

  return (
    <WlbScreenPage title="History">
      {groupedWorkouts.length > 0 ? (
        <SectionList
          style={{
            padding: 16,
          }}
          sections={groupedWorkouts}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <WorkoutCard
              key={item.id}
              workoutId={item.id}
              completedAt={item.completedAt}
            />
          )}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <WlbText color="sub">{section.title}</WlbText>
          )}
        />
      ) : (
        <View style={{ padding: 16, alignItems: 'center', gap: 16 }}>
          <WlbText>You haven't completed any workouts yet.</WlbText>
          <WlbButton
            title="Add Workout"
            onPress={() => router.push('/workouts')}
          />
        </View>
      )}
    </WlbScreenPage>
  );
}
