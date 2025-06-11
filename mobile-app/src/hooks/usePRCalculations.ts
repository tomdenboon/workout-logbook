import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { and, eq, isNotNull, lt, max, SQL, sql } from 'drizzle-orm';
import db from 'db';
import * as schema from 'db/schema';
import {
  calculateWorkoutPRs,
  calculateTotalVolume,
  type PR,
} from 'utils/prCalculations';
import { CALCULATION_TYPES } from 'utils/exerciseCalculations';
import { ExerciseGroupFull } from 'db/types';

interface UsePRCalculationsResult {
  prs: PR[];
  totalVolume: number;
  isLoading: boolean;
}

export function usePRCalculations(
  exerciseGroups: ExerciseGroupFull[],
  completedAt: number | null,
): UsePRCalculationsResult {
  const { data: historicalPRs } = useLiveQuery(
    db
      .select({
        exerciseId: schema.exerciseGroups.exerciseId,
        exerciseType: schema.exercises.type,
        ...Object.values(CALCULATION_TYPES).reduce<
          Record<string, SQL<string | null>>
        >((acc, type) => {
          acc[type.label] = max(type.sqlValue);
          return acc;
        }, {}),
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

  const isLoading = !historicalPRs;

  const prs = isLoading
    ? []
    : calculateWorkoutPRs(exerciseGroups, historicalPRs as any);
  const totalVolume = calculateTotalVolume(exerciseGroups);

  return {
    prs,
    totalVolume,
    isLoading,
  };
}
