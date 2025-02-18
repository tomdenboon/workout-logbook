import React from 'react';
import { Link, router, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import WlbButton from '../../components/WlbButton';
import { useEffect, useState } from 'react';
import WlbInput from '../../components/WlbInput';
import { ExerciseGroup } from '../../model/ExerciseGroup';
import WlbModal from '../../components/WlbModal';
import { useTheme } from '../../context/theme';
import ExerciseList from '../../components/ExercisePage';
import WlbHeader from '../../components/WlbPage';
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import WlbView from '../../components/WlbView';
import WlbPage from '../../components/WlbPage';
import { Exercise, VALID_FIELDS } from '../../model/Exercise';
import WlbText from '../../components/WlbText';

function ExerciseRowComponent({
  exerciseRow,
  exercise,
}: {
  exerciseRow: any;
  exercise: Exercise;
}) {
  const [localExerciseRow, setLocalExerciseRow] = useState(exerciseRow);

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {VALID_FIELDS[exercise.type].map((field) => (
        <WlbInput
          key={field}
          size="small"
          style={{ flex: 1, textAlign: 'center' }}
          value={localExerciseRow[field]}
          onChangeText={(value) =>
            setLocalExerciseRow({ ...localExerciseRow, [field]: value })
          }
          placeholder={field}
        />
      ))}
      <WlbButton
        size="small"
        variant={localExerciseRow.isLifted ? 'primary' : 'secondary'}
        onPress={() =>
          setLocalExerciseRow({
            ...localExerciseRow,
            isLifted: !localExerciseRow.isLifted,
          })
        }
        icon={'check'}
      />
    </View>
  );
}

function ExerciseGroupComponent({
  exerciseGroup,
  addExerciseRow,
}: {
  exerciseGroup: any;
  addExerciseRow: (exercise: Exercise) => void;
}) {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <WlbButton
          variant="text"
          title={exerciseGroup.exercise.name}
          size="small"
          onPress={() => {}}
        />
        <WlbButton
          variant="primary"
          icon="keyboard-control"
          size="small"
          onPress={() => {}}
        />
      </View>

      {exerciseGroup.exerciseRows.map((exerciseRow: any) => (
        <ExerciseRowComponent
          key={exerciseRow.id}
          exerciseRow={exerciseRow}
          exercise={exerciseGroup.exercise}
        />
      ))}
      <WlbButton
        variant="secondary"
        size="small"
        title="+ Add set"
        onPress={() => addExerciseRow(exerciseGroup.exercise)}
      />
    </View>
  );
}

export default function Workout() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [exerciseGroups, setExerciseGroups] = useState<any[]>([]);
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);

  const createExerciseRow = (exercise: Exercise) => ({
    reps: 10,
    weight: 100,
    isLifted: false,
  });

  const addExerciseRow = (index: number) => {
    setExerciseGroups([
      ...exerciseGroups.slice(0, index),
      {
        ...exerciseGroups[index],
        exerciseRows: [
          ...exerciseGroups[index].exerciseRows,
          createExerciseRow(exerciseGroups[index].exercise),
        ],
      },
      ...exerciseGroups.slice(index + 1),
    ]);
  };

  const addExercises = (exercises: Exercise[]) => {
    setExerciseGroups([
      ...exerciseGroups,
      ...exercises.map((exercise) => ({
        exercise,
        exerciseRows: [createExerciseRow(exercise)],
      })),
    ]);
    setAddExerciseModalVisible(false);
  };

  useEffect(() => {
    if (id === 'new') {
      setName('New workout');
    } else {
      setName('Workout');
    }
  }, [id]);

  return (
    <WlbView>
      <WlbPage
        containerStyle={{ gap: 20, paddingBottom: 16 }}
        title="New workout"
        headerRight={
          <WlbButton
            onPress={() => router.back()}
            variant="primary"
            title="Save"
          />
        }
        headerLeft={
          <WlbButton
            onPress={() => router.back()}
            variant="secondary"
            icon="close"
          />
        }
      >
        <WlbInput
          value={name}
          onChangeText={setName}
          placeholder="Workout name"
        />
        {exerciseGroups.map((exerciseGroup, index) => (
          <ExerciseGroupComponent
            key={index}
            addExerciseRow={() => addExerciseRow(index)}
            exerciseGroup={exerciseGroup}
          />
        ))}
        <WlbButton
          title="Add exercises"
          variant="text"
          onPress={() => setAddExerciseModalVisible(true)}
        />

        <WlbModal
          visible={addExerciseModalVisible}
          close={() => setAddExerciseModalVisible(false)}
        >
          <ExerciseList
            addExercises={addExercises}
            onClose={() => setAddExerciseModalVisible(false)}
          />
        </WlbModal>
        <WlbButton
          title="Cancel workout"
          variant="error"
          onPress={() => router.back()}
        />
      </WlbPage>
    </WlbView>
  );
}
