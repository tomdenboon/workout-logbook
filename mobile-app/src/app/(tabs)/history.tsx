import React, { useState, memo } from 'react';
import { WlbHeader, WlbModalPage, WlbScreenPage } from 'components/WlbPage';
import { SectionList, View, ScrollView } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import { desc, isNotNull, eq, and, gte, lte } from 'drizzle-orm';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'context/theme';
import { formatTime } from 'hooks/useTimer';
import WlbText from 'components/WlbText';
import Calendar from 'components/Calendar';

const WorkoutCard = memo(function WorkoutCard({
  workoutId,
  completedAt,
}: {
  workoutId: number;
  completedAt: number | null;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();
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

  const formatDate = () => {
    return completedDate.toLocaleTimeString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  const StatsRow = () => {
    const items = [
      {
        icon: 'clock-outline',
        value: formatTime(
          (workoutDetails.completedAt ?? 0) - (workoutDetails.startedAt ?? 0),
          'digital',
        ),
      },
      {
        icon: 'weight',
        value: totalVolume > 0 ? totalVolumeFormatted : '0',
      },
      {
        icon: 'trophy',
        value: prs.length,
      },
    ] as const;

    return (
      <View style={{ flexDirection: 'row', gap: 20 }}>
        {items.map((item) => (
          <View
            key={item.icon}
            style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}
          >
            <MaterialCommunityIcons
              name={item.icon}
              color={theme.text}
              size={20}
            />
            <WlbText>{item.value}</WlbText>
          </View>
        ))}
      </View>
    );
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
          <WlbText color="sub">{formatDate()}</WlbText>
          <StatsRow />

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
        header={
          <WlbHeader
            title={workoutDetails.name}
            headerLeft={
              <WlbButton
                color="subAlt"
                icon="close"
                size="small"
                onPress={() => setShowDetails(false)}
              />
            }
            headerBottom={
              <View style={{ gap: 8 }}>
                <WlbText color="sub">{formatDate()}</WlbText>
                <StatsRow />
              </View>
            }
          />
        }
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
});

export default function History() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const workouts = useLiveQuery(
    db.query.workouts.findMany({
      where: isNotNull(schema.workouts.completedAt),
      orderBy: desc(schema.workouts.completedAt),
    }),
  );

  const workoutDates = new Set(
    workouts?.data?.map((workout) =>
      new Date(workout.completedAt!).toDateString(),
    ),
  );

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredWorkouts = workouts?.data?.filter((workout) =>
    selectedDate
      ? new Date(workout.completedAt!).getTime() <=
        selectedDate.getTime() + 24 * 60 * 60 * 1000
      : true,
  );

  const headerTitle = selectedDate
    ? formatSelectedDate(selectedDate)
    : 'Workouts';

  return (
    <WlbScreenPage
      header={
        <WlbHeader
          title={headerTitle}
          headerRight={
            selectedDate && (
              <WlbButton
                title="Clear"
                size="small"
                variant="ghost"
                onPress={() => setSelectedDate(undefined)}
              />
            )
          }
        />
      }
      noContainer
    >
      <SectionList
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={() => (
          <Calendar
            onDateSelect={(date) => setSelectedDate(date)}
            selectedDate={selectedDate}
            isHighlighted={(date) => workoutDates.has(date.toDateString())}
          />
        )}
        sections={[{ data: filteredWorkouts }]}
        SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <WorkoutCard
            key={item.id}
            workoutId={item.id}
            completedAt={item.completedAt}
          />
        )}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => (
          <View style={{ padding: 16, alignItems: 'center', gap: 16 }}>
            <WlbText>
              {selectedDate
                ? `No workouts completed on ${formatSelectedDate(
                    selectedDate,
                  )}.`
                : "You haven't completed any workouts yet."}
            </WlbText>
            <WlbButton
              title="Add Workout"
              onPress={() => router.push('/workouts')}
            />
          </View>
        )}
      />
    </WlbScreenPage>
  );
}
