import db from 'db';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';
import * as schema from 'db/schema';
import { ThemeName } from 'context/theme';

export async function deleteWorkout(id: number) {
  await db.delete(schema.workouts).where(eq(schema.workouts.id, id));
}

export async function duplicateWorkout(id: number, start: boolean = false) {
  const workout = await db.query.workouts.findFirst({
    where: eq(schema.workouts.id, id),
    with: {
      exerciseGroups: {
        with: {
          exerciseRows: true,
        },
      },
    },
  });

  if (!workout) {
    return;
  }

  if (start) {
    await deleteActiveWorkout();
  }

  const newWorkout = await db
    .insert(schema.workouts)
    .values({
      ...workout,
      startedAt: start ? Date.now() : undefined,
      id: undefined,
    })
    .returning();

  for (const exerciseGroup of workout.exerciseGroups) {
    const exerciseGroupResult = await db
      .insert(schema.exerciseGroups)
      .values({
        ...exerciseGroup,
        workoutId: newWorkout[0].id,
        id: undefined,
      })
      .returning();

    for (const exerciseRow of exerciseGroup.exerciseRows) {
      await db.insert(schema.exerciseRows).values({
        ...exerciseRow,
        id: undefined,
        isLifted: 0,
        exerciseGroupId: exerciseGroupResult[0].id,
      });
    }
  }

  return newWorkout[0].id;
}

export async function createWorkout() {
  await deleteActiveWorkout();

  const workout = await db
    .insert(schema.workouts)
    .values({
      name: 'New workout',
      startedAt: Date.now(),
    })
    .returning();

  return workout[0].id;
}

export async function finishWorkout(id: number) {
  await db
    .update(schema.workouts)
    .set({ completedAt: Date.now() })
    .where(eq(schema.workouts.id, id));
}

async function deleteActiveWorkout() {
  await db
    .delete(schema.workouts)
    .where(
      and(
        isNull(schema.workouts.completedAt),
        isNotNull(schema.workouts.startedAt),
      ),
    );
}

export async function setSetting(key: string, value: string) {
  const existing = await db.query.settings.findFirst({
    where: eq(schema.settings.key, key),
  });

  if (existing) {
    await db
      .update(schema.settings)
      .set({ value })
      .where(eq(schema.settings.key, key));
  } else {
    await db.insert(schema.settings).values({ key, value });
  }
}

export async function setWeightUnit(unit: 'kg' | 'lbs') {
  await setSetting('weightUnit', unit);
}

export async function setDistanceUnit(unit: 'km' | 'mi') {
  await setSetting('distanceUnit', unit);
}

export async function setTheme(theme: ThemeName) {
  await setSetting('theme', theme);
}
