import { ExerciseGroupFull } from 'db/types';
import { ExerciseCategory } from 't';
import { CALCULATION_TYPES, CalculationType } from 'utils/exerciseCalculations';

export interface PR {
  exerciseRowId: number;
  badgeType: string;
}

const PR_CONFIGS: Record<ExerciseCategory, CalculationType[]> = {
  weighted: [
    CALCULATION_TYPES.weight,
    CALCULATION_TYPES.reps,
    CALCULATION_TYPES.oneRm,
    CALCULATION_TYPES.volume,
  ],
  reps: [CALCULATION_TYPES.reps],
  duration: [CALCULATION_TYPES.time],
  distance: [CALCULATION_TYPES.distance],
};

export function calculateWorkoutPRs(
  exerciseGroups: ExerciseGroupFull[],
  historicalPRs: Record<string, number | null>[],
): PR[] {
  return exerciseGroups.flatMap((group) => {
    const historicalPR = historicalPRs.find(
      (pr) => pr.exerciseId === group.exercise.id,
    );
    const configs = PR_CONFIGS[group.exercise.type];

    if (!group.exerciseRows.length) return [];

    return configs.flatMap((config) => {
      const maxRow = group.exerciseRows.reduce((max, row) =>
        config.getValue(row) > config.getValue(max) ? row : max,
      );

      const currentValue = config.getValue(maxRow);
      const historicalValue = historicalPR ? historicalPR[config.label] : null;
      const isPR = currentValue > (historicalValue ?? 0);
      return isPR
        ? [{ exerciseRowId: maxRow.id, badgeType: config.label }]
        : [];
    });
  });
}

export function calculateTotalVolume(
  exerciseGroups: ExerciseGroupFull[],
): number {
  return exerciseGroups
    .flatMap((group) => group.exerciseRows)
    .reduce((total, row) => total + CALCULATION_TYPES.volume.getValue(row), 0);
}
