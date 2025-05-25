export type ExerciseCategory = 'reps' | 'weighted' | 'duration' | 'distance';
export const t: { categories: Record<ExerciseCategory, string> } = {
  categories: {
    reps: 'Reps',
    weighted: 'Weighted',
    duration: 'Duration',
    distance: 'Distance',
  },
};
