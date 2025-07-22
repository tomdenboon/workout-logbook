import React, { useState, memo } from 'react';
import { WlbHeader, WlbScreenPage } from 'components/WlbPage';
import { View, FlatList } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import { desc, isNotNull, eq } from 'drizzle-orm';
import * as schema from 'db/schema';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout, duplicateWorkout } from 'db/mutation';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import { ExerciseCategory, ExerciseRow } from 'db/types';
import { useUnit } from 'context/unit';
import { usePRCalculations } from 'hooks/usePRCalculations';
import { VALID_FIELDS } from 'const';
import WlbText from 'components/WlbText';
import WlbStatCard from 'components/WlbStatCard';
import {
  calculateCurrentWeekStreak,
  calculateRestDays,
} from 'utils/streakCalculations';
import WlbIcon from 'components/WlbIcon';
import WlbEmptyState from 'components/WlbEmptyState';
import WorkoutDetailsModal from 'components/workouts/WorkoutDetailsModal';
import WorkoutStatsRow from 'components/workouts/WorkoutStatsRow';
import WlbSection from 'components/WlbSection';
import WlbCalendar from 'components/WlbCalendar';

const WorkoutCard = memo(function WorkoutCard({
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

  const completedDate = new Date(workoutDetails.completedAt as number);

  const formatDate = () => {
    return completedDate.toLocaleTimeString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
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
                size="small"
                icon="dots-horizontal"
              />
            )}
            options={[
              {
                icon: 'pencil',
                label: 'Edit Workout',
                onPress: () => router.push(`/workouts/${workoutId}`),
              },
              {
                icon: 'content-copy',
                label: 'Save as Template',
                onPress: () => duplicateWorkout(workoutId),
              },
              {
                icon: 'delete',
                label: 'Delete Workout',
                onPress: () => deleteWorkout(workoutId),
              },
            ]}
          />
        }
      >
        <View style={{ gap: 8 }}>
          <WlbText color="sub">{formatDate()}</WlbText>
          <WorkoutStatsRow
            startedAt={workoutDetails.startedAt}
            completedAt={workoutDetails.completedAt}
            totalVolume={totalVolume}
            prCount={prs.length}
          />
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

      <WorkoutDetailsModal
        visible={showDetails}
        onClose={() => setShowDetails(false)}
        workoutDetails={workoutDetails}
        prs={prs}
        totalVolume={totalVolume}
      />
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

  const renderEmpty = () => (
    <WlbEmptyState
      onPress={() => router.push('/workout')}
      description="Add a workout to get started"
    />
  );

  return (
    <WlbScreenPage header={<WlbHeader title={'History'} />} noContainer>
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        ListHeaderComponent={() => (
          <View style={{ gap: 12, paddingBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <WlbStatCard
                icon="fire"
                value={calculateCurrentWeekStreak(filteredWorkouts)}
                label="Week Streak"
              />
              <WlbStatCard
                icon="moon-waning-crescent"
                value={calculateRestDays(filteredWorkouts)}
                label="Rest Days"
              />
            </View>
            <WlbCalendar
              onDateSelect={(date) => setSelectedDate(date)}
              selectedDate={selectedDate}
              isHighlighted={(date) => workoutDates.has(date.toDateString())}
            />
            {selectedDate ? (
              <WlbSection title={formatSelectedDate(selectedDate)}>
                <WlbButton
                  title="Clear"
                  size="small"
                  variant="ghost"
                  onPress={() => setSelectedDate(undefined)}
                />
              </WlbSection>
            ) : (
              <WlbSection title="Workout history (300)" />
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <WorkoutCard
            key={item.id}
            workoutId={item.id}
            completedAt={item.completedAt}
          />
        )}
        ListEmptyComponent={renderEmpty}
      />
    </WlbScreenPage>
  );
}
