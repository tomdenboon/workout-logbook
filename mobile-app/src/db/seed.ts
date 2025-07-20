import { toDateKey } from 'utils/date';
import * as schema from './schema';
import db, { fastDb } from 'db';

export async function seedData({ reset = false }) {
  if (reset) {
    await fastDb.delete(schema.workouts);
    await fastDb.delete(schema.exercises);
    await fastDb.delete(schema.measurements);
  }

  if ((await fastDb.$count(schema.exercises)) != 0) {
    return;
  }

  await seedMeasurements();
  await seedWorkouts();
}

async function seedExercises() {
  return await fastDb
    .insert(schema.exercises)
    .values([
      {
        name: 'Bench Press',
        type: 'weighted',
      },
      {
        name: 'Squat',
        type: 'weighted',
      },
      {
        name: 'Deadlift',
        type: 'weighted',
      },
      {
        name: 'Pull-Up',
        type: 'reps',
      },
      {
        name: 'Running',
        type: 'distance',
      },
    ])
    .returning();
}

async function seedWorkouts() {
  const exercises = await seedExercises();

  const workouts = await fastDb
    .insert(schema.workouts)
    .values(Array.from({ length: 300 }, (_, i) => generateWorkout(i)))
    .returning();

  const groups = await fastDb
    .insert(schema.exerciseGroups)
    .values(
      workouts.flatMap((workout) =>
        exercises.map((exercise) => ({
          workoutId: workout.id,
          exerciseId: exercise.id,
        })),
      ),
    )
    .returning();

  const chunkedExerciseRows = chunk(
    groups.flatMap((group) =>
      Array.from({ length: randomInt(1, 10) }, () => ({
        exerciseGroupId: group.id,
        weight: randomFloat(1, 100),
        reps: randomInt(1, 20),
        time: randomInt(6000, 10000),
        distance: randomFloat(1, 10),
        rpe: randomInt(1, 10),
        isLifted: 1,
      })),
    ),
    200,
  );

  chunkedExerciseRows.forEach(
    async (c) => await fastDb.insert(schema.exerciseRows).values(c),
  );
}

function generateWorkout(i: number) {
  const startedAt = randomDate(new Date('2015-01-01'), new Date());
  const completedAt = randomDate(
    startedAt,
    new Date(startedAt.getTime() + randomInt(1000000, 10000000)),
  );

  return {
    name: `Workout ${i}`,
    startedAt: startedAt.getTime(),
    completedAt: completedAt.getTime(),
  };
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

export async function seedMeasurements() {
  const measurements = await fastDb
    .insert(schema.measurements)
    .values([{ name: 'Weight' }, { name: 'Body Fat' }, { name: 'Muscle Mass' }])
    .returning();

  await fastDb.insert(schema.measurementPoints).values(
    measurements.flatMap((measurement) =>
      Array.from({ length: 200 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i * 7);

        return {
          measurementId: measurement.id,
          date: date.getTime(),
          dateKey: toDateKey(date),
          value: randomInt(50, 100),
        };
      }),
    ),
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
