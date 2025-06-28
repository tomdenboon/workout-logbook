import { Workout } from 'db/types';

export function calculateCurrentWeekStreak(workouts: Workout[]): number {
  if (!workouts.length) return 0;

  const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d.toISOString().split('T')[0];
  };

  const mondaySet = new Set(
    workouts.map((w) => getMonday(new Date(w.completedAt!))),
  );

  const thisWeek = getMonday(new Date());
  const lastWeek = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return getMonday(date);
  })();

  let currentWeek = mondaySet.has(thisWeek) ? thisWeek : lastWeek;
  if (!mondaySet.has(currentWeek)) return 0;

  let streak = 0;
  while (mondaySet.has(currentWeek)) {
    streak++;
    const prevDate = new Date(currentWeek);
    prevDate.setDate(prevDate.getDate() - 7);
    currentWeek = prevDate.toISOString().split('T')[0];
  }

  return streak;
}

export function calculateRestDays(workouts: Workout[]): number {
  if (!workouts.length) return 0;

  // Find the most recent workout
  const lastWorkout = Math.max(...workouts.map((w) => w.completedAt!));
  const lastWorkoutDate = new Date(lastWorkout);
  const today = new Date();

  // Calculate days since last workout
  const diffTime = today.getTime() - lastWorkoutDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}
