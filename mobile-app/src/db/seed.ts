import * as schema from './schema';
import db from 'db';

export async function resetSeed() {
  await db.delete(schema.workouts);
  await db.delete(schema.exercises);
  await db.delete(schema.measurements);

  await seedData();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function seedData() {
  if ((await db.$count(schema.exercises)) != 0) {
    return;
  }

  await seedMeasurements();
  const exercises = await db
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
    ])
    .returning();

  for (let i = 0; i < 100; i++) {
    const startedAt = randomDate(new Date('2015-01-01'), new Date());
    const completedAt = randomDate(
      startedAt,
      new Date(startedAt.getTime() + randomInt(1000000, 10000000)),
    );
    await seedWorkout(
      `Workout ${i + 1}`,
      startedAt.getTime(),
      completedAt.getTime(),
      exercises,
    );

    await delay(10);
  }
}

export async function seedWorkout(
  name: string,
  startedAt: number,
  completedAt: number,
  exercises: any[],
) {
  const workout = await db
    .insert(schema.workouts)
    .values([
      {
        name,
        startedAt,
        completedAt,
      },
    ])
    .returning();

  const groups = await db
    .insert(schema.exerciseGroups)
    .values(
      exercises.map((exercise) => ({
        workoutId: workout[0].id,
        exerciseId: exercise.id,
      })),
    )
    .returning();

  await db.insert(schema.exerciseRows).values(
    groups.flatMap((group) =>
      Array.from({ length: randomInt(1, 10) }, () => ({
        exerciseGroupId: group.id,
        weight: randomInt(1, 100),
        reps: randomInt(1, 20),
        time: randomInt(1, 10),
        distance: randomInt(1, 10),
        rpe: randomInt(1, 10),
        isLifted: 1,
      })),
    ),
  );
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seedMeasurements() {
  const measurements = await db
    .insert(schema.measurements)
    .values([{ name: 'Weight' }, { name: 'Body Fat' }, { name: 'Muscle Mass' }])
    .returning();

  for (const measurement of measurements) {
    for (let i = 0; i < 50; i++) {
      const date = randomDate(new Date('2020-01-01'), new Date()).getTime();
      const value = randomInt(50, 100);

      await db.insert(schema.measurementPoints).values({
        measurementId: measurement.id,
        date,
        value,
      });
    }
  }
}
