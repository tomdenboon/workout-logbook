import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Exercise, EXERCISE_CATEGORIES } from '../model/Exercise';
import { Q } from '@nozbe/watermelondb';
import useSubscribe from '../hooks/useSubscribe';
import { useThemedStyleSheet } from '../context/theme';
import { useDatabase } from '@nozbe/watermelondb/react';
import toOptions from '../toOptions';
import WlbText from './WlbText';
import ModalForm from './ModalForm';
import WlbHeader from './WlbPage';
import WlbButton from './WlbButton';

export default function ExercisePage({
  onClose,
  addExercises,
}: {
  onClose?: () => void;
  addExercises?: (exercises: Exercise[]) => void;
}) {
  const database = useDatabase();
  const styles = useStyles();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const exercises = useSubscribe(
    database.get<Exercise>('exercises').query(Q.sortBy('name')).observe(),
  );
  const [visible, setVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  const toggle = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id),
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedExercise(undefined);
  };

  const openModal = (exercise?: Exercise) => {
    setVisible(true);
    setSelectedExercise(exercise);
  };

  const onSave = (value: any) => {
    database
      .write(async () => {
        if (selectedExercise) {
          selectedExercise.update((exercise) => {
            exercise.name = value.name;
            exercise.type = value.type;
          });
        } else {
          const exerciseCollection = database.get<Exercise>('exercises');
          exerciseCollection.create((exercise) => {
            exercise.name = value.name;
            exercise.type = value.type;
          });
        }
      })
      .then(closeModal);
  };

  const groupedExercises = exercises?.reduce((acc, exercise) => {
    const firstLetter = exercise.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return (
    <WlbHeader
      title="Exercises"
      headerLeft={
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {onClose && (
            <WlbButton
              variant="secondary"
              size="small"
              icon="close"
              onPress={onClose}
            />
          )}
          <WlbButton variant="text" onPress={() => openModal()} title="New" />
        </View>
      }
      headerRight={
        addExercises && (
          <WlbButton
            variant="text"
            title="Add"
            onPress={() => {
              addExercises(selectedExercises);
              onClose?.();
            }}
          />
        )
      }
      containerStyle={{ padding: 0, paddingBottom: 16 }}
    >
      <ModalForm
        title={selectedExercise ? 'Edit Exercise' : 'Add Exercise'}
        visible={visible}
        close={closeModal}
        init={{
          name: selectedExercise?.name ?? '',
          type: selectedExercise?.type ?? 'REPS',
        }}
        inputs={[
          { type: 'text', key: 'name', label: 'Name' },
          {
            type: 'select',
            key: 'type',
            label: 'Category',
            options: toOptions(EXERCISE_CATEGORIES),
          },
        ]}
        onSave={onSave}
      />
      {Object.entries(groupedExercises ?? {}).map(([letter, exercises]) => (
        <View key={letter}>
          <View style={styles.itemContainer}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
          {exercises.map((exercise) => (
            <Pressable
              key={exercise.id}
              onPress={() =>
                !addExercises ? openModal(exercise) : toggle(exercise)
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
                    {EXERCISE_CATEGORIES[exercise.type]}
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
    </WlbHeader>
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
      backgroundColor: theme.background,
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
