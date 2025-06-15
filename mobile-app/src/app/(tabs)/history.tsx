import React, { useState } from 'react';
import { WlbModalPage, WlbScreenPage } from 'components/WlbPage';
import { SectionList, View, ScrollView } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { desc, isNotNull, eq } from 'drizzle-orm';
import * as schema from 'db/schema';
import groupBy from 'utils/groupBy';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout } from 'db/mutation';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import WlbTimer from 'components/WlbTimer';
import { ExerciseCategory, ExerciseRow } from 'db/types';
import { useUnit } from 'context/unit';
import { usePRCalculations } from 'hooks/usePRCalculations';
import { VALID_FIELDS } from 'const';

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

  const {
    prs,
    totalVolume,
    isLoading: prLoading,
  } = usePRCalculations(workoutDetails?.exerciseGroups || [], completedAt);

  if (!workoutDetails || prLoading) {
    return (
      <WlbCard title="Loading...">
        <WlbText>Loading...</WlbText>
      </WlbCard>
    );
  }

  const totalVolumeFormatted = formatValueWithUnit(totalVolume, 'weight');
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
        {workoutDetails.exerciseGroups.map((group) => (
          <View key={group.id} style={{ gap: 8 }}>
            <WlbText fontWeight="bold">{group.exercise.name}</WlbText>
            <View style={{ gap: 4 }}>
              {group.exerciseRows.map((row, index) => {
                const rowPRs = prs.filter((pr) => pr.exerciseRowId === row.id);
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
                        {rowPRs.map((pr) => (
                          <WlbText key={pr.badgeType} size={14}>
                            🏆 {pr.badgeType}
                          </WlbText>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
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
    <WlbScreenPage title="History" noContainer>
      {groupedWorkouts.length > 0 ? (
        <SectionList
          contentContainerStyle={{ padding: 16 }}
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
