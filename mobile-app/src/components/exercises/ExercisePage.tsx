import React, { useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
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
import useEditExerciseModal from 'components/exercises/useEditExerciseModal';
import { router } from 'expo-router';
import { EXERCISE_CATEGORIES } from 'const';
import WlbInput from 'components/WlbInput';

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
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedExercises = filteredExercises?.reduce((acc, exercise) => {
    const firstLetter = (exercise.name[0] ?? '-').toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const editExerciseButton = (
    <WlbButton
      variant="ghost"
      onPress={() => editExerciseModal.openModal()}
      title="New"
    />
  );

  const searchInput = (
    <WlbInput
      value={searchTerm}
      onChangeText={setSearchTerm}
      placeholder="Search exercises..."
    />
  );

  const container = (children: React.ReactNode) =>
    modal ? (
      <WlbModalPage
        {...modal}
        header={
          <WlbHeader
            title="Add exercises"
            headerLeft={
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <WlbButton
                  color="subAlt"
                  size="small"
                  icon="close"
                  onPress={modal.close}
                />
                {editExerciseButton}
              </View>
            }
            headerRight={
              <WlbButton
                variant="ghost"
                title="Add"
                onPress={() => {
                  modal.addExercises(selectedExercises);
                  modal.close();
                }}
              />
            }
            headerBottom={searchInput}
          />
        }
        noContainer
      >
        {children}
      </WlbModalPage>
    ) : (
      <WlbScreenPage
        header={
          <WlbHeader
            title="Exercises"
            headerLeft={editExerciseButton}
            headerBottom={searchInput}
          />
        }
        noContainer
      >
        {children}
      </WlbScreenPage>
    );

  return container(
    <ScrollView>
      <ModalForm {...editExerciseModal} />
      {Object.entries(groupedExercises ?? {}).map(([letter, exercises]) => (
        <View key={letter}>
          <View style={styles.itemContainer}>
            <WlbText size={14} color="sub">
              {letter}
            </WlbText>
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
                <View style={{ gap: 4 }}>
                  <WlbText fontWeight="bold">{exercise.name}</WlbText>
                  <WlbText size={14} color="sub">
                    {EXERCISE_CATEGORIES[exercise.type]}
                  </WlbText>
                </View>
                {selectedExercises.includes(exercise) && (
                  <WlbText color="main">Selected</WlbText>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>,
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
  }));
