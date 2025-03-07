import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { eq, inArray, OptionalKeyOnly } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import { Exercise, Workout, ExerciseGroup, ExerciseRow } from 'db/types';
import { deleteWorkout } from 'db/mutation';

type PartialKeys<T, TRequired extends keyof T> = Omit<T, TRequired> &
  Partial<Pick<T, TRequired>>;

export type WorkoutForm = PartialKeys<Workout, 'id'> & {
  exerciseGroups: {
    id?: number;
    exercise: Exercise;
    exerciseRows: PartialKeys<ExerciseRow, 'id' | 'exerciseGroupId'>[];
  }[];
};

function useCurrentWorkout() {
  const { id } = useLocalSearchParams();

  return useLiveQuery(
    db.query.workouts.findFirst({
      where: eq(schema.workouts.id, Number(id)),
      with: {
        exerciseGroups: {
          with: {
            exercise: true,
            exerciseRows: true,
          },
        },
      },
    }),
    [id],
  ).data;
}

export default function useWorkout() {
  const currentWorkout = useCurrentWorkout();

  const type: 'active' | 'completed' | 'template' = useMemo(() => {
    if (currentWorkout?.completedAt) {
      return 'completed';
    } else if (currentWorkout?.startedAt) {
      return 'active';
    } else {
      return 'template';
    }
  }, [currentWorkout]);
  const realtime = useMemo(() => type === 'active', [type]);

  const [workout, setWorkout] = useState<WorkoutForm>({
    name: '',
    exerciseGroups: [] as any,
    startedAt: null,
    completedAt: null,
    templateFolderId: null,
  });

  const initializeWorkout = useCallback(async () => {
    if (!currentWorkout) {
      setWorkout({
        name: '',
        exerciseGroups: [] as any,
        startedAt: null,
        completedAt: null,
        templateFolderId: null,
      });
      return;
    } else {
      setWorkout(currentWorkout);
    }
  }, [currentWorkout]);

  useEffect(() => {
    initializeWorkout();
  }, [initializeWorkout]);

  const createExerciseRow = () => ({
    reps: null,
    weight: null,
    distance: null,
    time: null,
    rpe: null,
    isLifted: 0,
  });

  const updateExerciseRow = async (
    exerciseGroupIndex: number,
    exerciseRowIndex: number,
    exerciseRow: any,
  ) => {
    const newExerciseRow = {
      ...exerciseRow,
    };

    if (realtime) {
      await db
        .update(schema.exerciseRows)
        .set(newExerciseRow)
        .where(
          eq(
            schema.exerciseRows.id,
            workout.exerciseGroups[exerciseGroupIndex].exerciseRows[
              exerciseRowIndex
            ].id as number,
          ),
        );
    }

    workout.exerciseGroups[exerciseGroupIndex].exerciseRows[exerciseRowIndex] =
      newExerciseRow;
    setWorkout({ ...workout });
  };

  const addExerciseRow = async (exerciseGroupIndex: number) => {
    const newExerciseRow: any = createExerciseRow();
    if (realtime) {
      const result = await db
        .insert(schema.exerciseRows)
        .values({
          ...newExerciseRow,
          exerciseGroupId: workout.exerciseGroups[exerciseGroupIndex]
            .id as number,
        })
        .returning();

      newExerciseRow.id = result[0].id;
    }

    workout.exerciseGroups[exerciseGroupIndex].exerciseRows.push(
      newExerciseRow,
    );
    setWorkout({ ...workout });
  };

  const deleteExerciseRow = async (
    exerciseGroupIndex: number,
    exerciseRowIndex: number,
  ) => {
    if (realtime) {
      await db
        .delete(schema.exerciseRows)
        .where(
          eq(
            schema.exerciseRows.id,
            workout.exerciseGroups[exerciseGroupIndex].exerciseRows[
              exerciseRowIndex
            ].id as number,
          ),
        );
    }

    workout.exerciseGroups[exerciseGroupIndex].exerciseRows.splice(
      exerciseRowIndex,
      1,
    );

    setWorkout({ ...workout });
  };

  const deleteExerciseGroup = async (exerciseGroupIndex: number) => {
    if (realtime) {
      await db
        .delete(schema.exerciseGroups)
        .where(
          eq(
            schema.exerciseGroups.id,
            workout.exerciseGroups[exerciseGroupIndex].id as number,
          ),
        );
    }

    workout.exerciseGroups.splice(exerciseGroupIndex, 1);
    setWorkout({ ...workout });
  };

  const addExerciseGroups = async (exercises: Exercise[]) => {
    const newExerciseGroups: WorkoutForm['exerciseGroups'] = exercises.map(
      (exercise) => ({
        exercise,
        exerciseRows: [createExerciseRow()],
      }),
    );

    if (realtime) {
      const result = await db
        .insert(schema.exerciseGroups)
        .values(
          newExerciseGroups.map((exerciseGroup) => ({
            exerciseId: exerciseGroup.exercise.id,
            workoutId: workout.id as number,
          })),
        )
        .returning();

      result.forEach((exerciseGroup, index) => {
        newExerciseGroups[index].id = exerciseGroup.id;
      });

      await db.insert(schema.exerciseRows).values(
        newExerciseGroups.map((exerciseGroup) => ({
          exerciseGroupId: exerciseGroup.id as number,
          ...exerciseGroup.exerciseRows[0],
        })),
      );
    }

    workout.exerciseGroups.push(...newExerciseGroups);

    setWorkout({ ...workout });
  };

  const flush = async () => {
    if (workout.id) {
      await deleteWorkout(workout.id);
    }

    const result = await db.insert(schema.workouts).values(workout).returning();

    for (const exerciseGroup of workout.exerciseGroups) {
      const exerciseGroupResult = await db
        .insert(schema.exerciseGroups)
        .values({
          ...exerciseGroup,
          exerciseId: exerciseGroup.exercise.id,
          workoutId: result[0].id,
        })
        .returning();

      for (const exerciseRow of exerciseGroup.exerciseRows) {
        await db.insert(schema.exerciseRows).values({
          ...exerciseRow,
          exerciseGroupId: exerciseGroupResult[0].id,
        });
      }
    }
  };

  return {
    workout,
    type,
    setWorkout,
    addExerciseRow,
    deleteExerciseRow,
    deleteExerciseGroup,
    addExerciseGroups,
    updateExerciseRow,
    flush,
  };
}
