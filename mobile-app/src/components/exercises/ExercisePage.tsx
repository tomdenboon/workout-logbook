import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import db from 'db';
import { Exercise } from 'db/types';
import * as schema from 'db/schema';
import ModalForm from 'components/ModalForm';
import WlbButton from 'components/WlbButton';
import { WlbHeader, WlbModalPage, WlbScreenPage } from 'components/WlbPage';
import WlbText from 'components/WlbText';
import { useThemedStyleSheet } from 'context/theme';
import toOptions from 'toOptions';
import useEditExerciseModal from 'components/exercises/useEditExerciseModal';
import { t } from 't';
import { router } from 'expo-router';

export default function ExercisePage({
  modal,
}: {
  modal?: {
    close: () => void;
    addExercises: (exercises: Exercise[]) => void;
    visible: boolean;
  };
}) {
  const styles = useStyles();
  const editExerciseModal = useEditExerciseModal();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const { data: exercises } = useLiveQuery(
    db.select().from(schema.exercises).orderBy(schema.exercises.name),
  );

  const toggle = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id),
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const groupedExercises = exercises?.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const editExerciseButton = (
    <WlbButton
      variant="text"
      onPress={() => editExerciseModal.openModal()}
      title="New"
    />
  );

  const container = (children: React.ReactNode) =>
    modal ? (
      <WlbModalPage
        title="Add exercises"
        headerLeft={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <WlbButton
              variant="secondary"
              size="small"
              icon="close"
              onPress={modal.close}
            />
            {editExerciseButton}
          </View>
        }
        headerRight={
          <WlbButton
            variant="text"
            title="Add"
            onPress={() => {
              modal.addExercises(selectedExercises);
              modal.close();
            }}
          />
        }
        {...modal}
      >
        {children}
      </WlbModalPage>
    ) : (
      <WlbScreenPage title="Exercises" headerLeft={editExerciseButton}>
        {children}
      </WlbScreenPage>
    );

  return container(
    <>
      <ModalForm {...editExerciseModal} />
      {Object.entries(groupedExercises ?? {}).map(([letter, exercises]) => (
        <View key={letter}>
          <View style={styles.itemContainer}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
          {exercises.map((exercise) => (
            <Pressable
              key={exercise.id}
              onPress={() =>
                !modal
                  ? router.push(`/exercises/${exercise.id}`)
                  : toggle(exercise)
              }
              style={({ pressed }) => [
                styles.itemContainer,
                pressed && styles.exerciseItemPressed,
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseCategory}>
                    {t.categories[exercise.type]}
                  </Text>
                </View>
                {selectedExercises.includes(exercise) && (
                  <WlbText color="main">Selected</WlbText>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </>,
  );
}

const useStyles = () =>
  useThemedStyleSheet((theme) => ({
    exerciseItemPressed: {
      opacity: 0.7,
    },
    itemContainer: {
      height: 60,
      paddingHorizontal: 16,
      paddingBottom: 8,
      justifyContent: 'flex-end',
      backgroundColor: theme.bg,
      borderColor: theme.subAlt,
      borderBottomWidth: 2,
    },
    selectedContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      backgroundColor: theme.main,
    },
    letter: {
      fontSize: 14,
      color: theme.sub,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    exerciseCategory: {
      fontSize: 14,
      color: theme.sub,
      marginTop: 4,
    },
  }));
