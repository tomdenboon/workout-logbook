import { useCallback, useEffect, useMemo, useState } from 'react';
import { Exercise } from '../model/Exercise';
import { database } from '../model/database';
import { useLocalSearchParams } from 'expo-router';
import { Workout } from '../model/Workout';
import useSubscribe from './useSubscribe';
import { Q } from '@nozbe/watermelondb';
import { ExerciseGroup } from '../model/ExerciseGroup';
import { ExerciseRow } from '../model/ExerciseRow';
import { TableName } from '../model/tables';

function useCurrentWorkout() {
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);

  useEffect(() => {
    if (id && id != 'new') {
      database
        .get<Workout>('workouts')
        .find(id as string)
        .then((workout) => {
          setWorkout(workout);
        });
    }
  }, [id]);

  return workout;
}

export default function useWorkout() {
  const currentWorkout = useCurrentWorkout();

  const [workout, setWorkout] = useState<any>({
    name: '',
    date: new Date(),
    exerciseGroups: [],
  });

  const initializeWorkout = useCallback(async () => {
    if (!currentWorkout) {
      setWorkout({
        name: '',
        date: new Date(),
        exerciseGroups: [],
      });
      return;
    }

    const workout: any = { name: currentWorkout.name, exerciseGroups: [] };
    const exerciseGroups = await currentWorkout?.exerciseGroups.fetch();
    for (const exerciseGroup of exerciseGroups) {
      const exercise = await exerciseGroup.exercise.fetch();
      const exerciseRows = await exerciseGroup.exerciseRows.fetch();
      workout.exerciseGroups.push({
        exercise,
        exerciseRows: exerciseRows.map((exerciseRow) => ({
          reps: exerciseRow.reps,
          weight: exerciseRow.weight,
          time: exerciseRow.time,
          distance: exerciseRow.distance,
          isLifted: exerciseRow.isLifted,
        })),
      });
    }

    setWorkout(workout);
  }, [currentWorkout]);

  useEffect(() => {
    initializeWorkout();
  }, [initializeWorkout]);

  const createExerciseRow = (exercise: Exercise) => ({
    reps: 10,
    weight: 100,
    isLifted: false,
  });

  const updateExerciseRow = (
    exerciseGroupIndex: number,
    exerciseRowIndex: number,
    exerciseRow: any,
  ) => {
    workout.exerciseGroups[exerciseGroupIndex].exerciseRows[exerciseRowIndex] =
      exerciseRow;
    setWorkout({ ...workout });
  };

  const addExerciseRow = (exerciseGroupIndex: number) => {
    workout.exerciseGroups[exerciseGroupIndex].exerciseRows.push(
      createExerciseRow(workout.exerciseGroups[exerciseGroupIndex].exercise),
    );
    setWorkout({ ...workout });
  };

  const addExercises = (exercises: Exercise[]) => {
    workout.exerciseGroups.push(
      ...exercises.map((exercise) => ({
        exercise,
        exerciseRows: [createExerciseRow(exercise)],
      })),
    );

    setWorkout({ ...workout });
  };

  const flush = () => {
    database.write(async () => {
      const savedWorkout = await database
        .get<Workout>(TableName.Workout)
        .create((createWorkout) => {
          createWorkout.name = workout.name;
        });

      for (const exerciseGroup of workout.exerciseGroups) {
        const savedExerciseGroup = await database
          .get<ExerciseGroup>(TableName.ExerciseGroup)
          .create((createExerciseGroup) => {
            createExerciseGroup.workout.set(savedWorkout);
            createExerciseGroup.exercise.set(exerciseGroup.exercise);
          });

        for (const exerciseRow of exerciseGroup.exerciseRows) {
          await database
            .get<ExerciseRow>(TableName.ExerciseRow)
            .create((createExerciseRow) => {
              createExerciseRow.exerciseGroup.set(savedExerciseGroup);
              createExerciseRow.time = exerciseRow.time;
              createExerciseRow.distance = exerciseRow.distance;
              createExerciseRow.reps = exerciseRow.reps;
              createExerciseRow.weight = exerciseRow.weight;
              createExerciseRow.isLifted = exerciseRow.isLifted;
            });
        }
      }
    });
  };

  return {
    workout,
    setWorkout,
    addExerciseRow,
    addExercises,
    updateExerciseRow,
    flush,
  };
}
