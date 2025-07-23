import db from 'db';
import { Exercise } from 'db/types';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import toOptions from 'utils/toOptions';
import { EXERCISE_CATEGORIES } from 'const';

type ExerciseForm = {
  id?: number;
  name: string;
  type: keyof typeof EXERCISE_CATEGORIES;
};

export default function useEditExerciseModal() {
  const [visible, setVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseForm>();

  const close = () => {
    setVisible(false);
    setSelectedExercise(undefined);
  };

  const openModal = (exercise?: ExerciseForm) => {
    setVisible(true);
    setSelectedExercise(exercise);
  };

  const onSave = async (value: any) => {
    if (selectedExercise?.id) {
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
      {
        type: 'text' as const,
        key: 'name',
        label: 'Name',
        required: true,
      },
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
