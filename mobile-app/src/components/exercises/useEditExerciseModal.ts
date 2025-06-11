import db from 'db';
import { Exercise } from 'db/types';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import toOptions from 'utils/toOptions';
import { EXERCISE_CATEGORIES } from 'config';

export default function useEditExerciseModal() {
  const [visible, setVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  const close = () => {
    setVisible(false);
    setSelectedExercise(undefined);
  };

  const openModal = (exercise?: Exercise) => {
    setVisible(true);
    setSelectedExercise(exercise);
  };

  const onSave = async (value: any) => {
    if (selectedExercise) {
      await db
        .update(schema.exercises)
        .set({
          name: value.name,
          type: value.type,
        })
        .where(eq(schema.exercises.id, selectedExercise.id));
    } else {
      await db.insert(schema.exercises).values({
        name: value.name,
        type: value.type,
      });
    }
    close();
  };

  return {
    title: selectedExercise ? 'Edit Exercise' : 'Add Exercise',
    init: {
      name: selectedExercise?.name ?? '',
      type: selectedExercise?.type ?? 'reps',
    },
    inputs: [
      { type: 'text' as const, key: 'name', label: 'Name' },
      {
        type: 'select' as const,
        key: 'type',
        label: 'Category',
        options: toOptions(EXERCISE_CATEGORIES),
      },
    ],
    visible,
    openModal,
    close,
    onSave,
  };
}
