export type ExerciseCategory = 'reps' | 'weighted' | 'duration' | 'distance';
export const t: { categories: Record<ExerciseCategory, string> } = {
  categories: {
    reps: 'Reps',
    weighted: 'Weighted',
    duration: 'Duration',
    distance: 'Distance',
  },
};

export const VALID_FIELDS = {
  reps: ['reps'] as const,
  weighted: ['weight', 'reps'] as const,
  duration: ['time'] as const,
  distance: ['time', 'distance'] as const,
} as const;
