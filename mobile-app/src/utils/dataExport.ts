import db from 'db';
import * as schema from 'db/schema';
import { isNotNull, desc } from 'drizzle-orm';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export async function exportWorkoutsToCSV(): Promise<void> {
  const workouts = await db.query.workouts.findMany({
    where: isNotNull(schema.workouts.completedAt),
    with: {
      exerciseGroups: {
        with: {
          exercise: true,
          exerciseRows: true,
        },
      },
    },
    orderBy: [desc(schema.workouts.completedAt)],
  });

  const rows = workouts.flatMap((workout) => {
    return workout.exerciseGroups.flatMap((exerciseGroup) => {
      return exerciseGroup.exerciseRows.map((exerciseRow, setIndex) => {
        return {
          title: workout.name,
          workout_note: workout.note || '',
          started_at: new Date(workout.startedAt!).toISOString(),
          completed_at: new Date(workout.completedAt!).toISOString(),
          description: workout.note || '',
          exercise_title: exerciseGroup.exercise.name,
          set_index: setIndex,
          weight_kg: exerciseRow.weight,
          reps: exerciseRow.reps,
          distance_km: exerciseRow.distance,
          duration_seconds: exerciseRow.time,
          rpe: exerciseRow.rpe,
        };
      });
    });
  });

  const csvContent = [
    [
      'title',
      'workout_note',
      'started_at',
      'completed_at',
      'exercise_title',
      'set_index',
      'weight_kg',
      'reps',
      'distance_km',
      'duration_seconds',
      'rpe',
    ]
      .map((h) => `"${h}"`)
      .join(','),
    ...rows.map((row) =>
      [
        `"${row.title}"`,
        `"${row.workout_note}"`,
        `"${row.started_at}"`,
        `"${row.completed_at}"`,
        `"${row.description}"`,
        `"${row.exercise_title}"`,
        row.set_index.toString(),
        row.weight_kg?.toString() || '',
        row.reps?.toString() || '',
        row.distance_km?.toString() || '',
        row.duration_seconds?.toString() || '',
        row.rpe?.toString() || '',
      ].join(','),
    ),
  ].join('\n');

  const fileUri = FileSystem.documentDirectory + 'workout_data.csv';

  await FileSystem.writeAsStringAsync(fileUri, csvContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Workout Data',
    });
  }
}
