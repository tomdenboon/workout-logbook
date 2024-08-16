import { useEffect, useState } from 'react';
import { useDatabase } from '@nozbe/watermelondb/react';
import { Exercise } from '../../model/Exercise';
import { TableName } from '../../model/tables';
import { PageInner, PageOnStack } from '../../components/Page';
import clsx from 'clsx';
import ModalForm from '../../components/ModalForm';
import useModal from '../../hooks/useModal';
import { useNavigate, useParams } from 'react-router-dom';
import useSelectIds from '../../hooks/useSelectIds';
import Button from '../../components/Button';
import { Workout } from '../../model/Workout';
import { ExerciseGroup } from '../../model/ExerciseGroup';

function ExercisesPage() {
  const database = useDatabase();
  const { workoutId } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const { selectedIds, toggleId, isSelected } = useSelectIds();
  const navigate = useNavigate();
  const modalControls = useModal();

  useEffect(() => {
    database
      .get<Exercise>(TableName.Exercise)
      .query()
      .observe()
      .subscribe(setExercises);
  }, [database]);

  const groupedExercises = Object.groupBy(exercises, (e) =>
    (e.name.at(0) ?? '-').toUpperCase(),
  );

  const initialWorkoutState = {
    name: selectedExercise?.name ?? '',
    type: selectedExercise?.type ?? 'WEIGHTED',
  };

  const createExercise = (newExercise: typeof initialWorkoutState) => {
    database.write(async () => {
      if (selectedExercise) {
        await selectedExercise.update((exercise) => {
          exercise.name = newExercise.name;
          exercise.type = 'WEIGHTED';
        });
      } else {
        database.get<Exercise>(TableName.Exercise).create((exercise) => {
          exercise.name = newExercise.name;
          exercise.type = 'WEIGHTED';
        });
      }
    });
  };

  const addExercises = () => {
    if (!workoutId) {
      return;
    }

    database
      .get<Workout>(TableName.Workout)
      .find(workoutId)
      .then((workout) => {
        database.write(async () => {
          database.batch(
            exercises
              .filter((exercise) => selectedIds.includes(exercise.id))
              .map((exercise) =>
                database
                  .get<ExerciseGroup>(TableName.ExerciseGroup)
                  .prepareCreate((exerciseGroup) => {
                    exerciseGroup.workout.set(workout);
                    exerciseGroup.exercise.set(exercise);
                  }),
              ),
          );
        });
      });
    navigate('..');
  };

  const PageComponent = workoutId ? PageOnStack : PageInner;

  return (
    <PageComponent
      header={{
        title: 'Exercises',
        rightButton: (
          <ModalForm
            {...modalControls}
            key={selectedExercise?.id}
            close={() => {
              setSelectedExercise(undefined);
              modalControls.close();
            }}
            title="Add exercise"
            description="You can add your own exercise to track in your workouts."
            initialState={initialWorkoutState}
            renderOptions={[
              {
                label: 'Name',
                key: 'name',
              },
            ]}
            onSubmit={createExercise}
          />
        ),
      }}
      containerClassName="!p-0 relative"
    >
      {Object.keys(groupedExercises)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => (
          <div key={key}>
            <div className="p-2 border-b h-10 flex items-end text-sm text-gray-500">
              <p>{key}</p>
            </div>
            {groupedExercises[key]?.map((exercise) => (
              <div
                key={exercise.id}
                className={clsx(
                  'p-2 border-b',
                  isSelected(exercise.id) && 'bg-blue-100',
                )}
                onClick={() => {
                  if (workoutId) {
                    toggleId(exercise.id);
                  } else {
                    setSelectedExercise(exercise);
                    modalControls.open();
                  }
                }}
              >
                <p>{exercise.name}</p>
              </div>
            ))}
          </div>
        ))}

      {workoutId && (
        <div className="sticky bottom-0 p-2 w-full">
          <Button className="w-full" onClick={() => addExercises()}>
            Add Exercises
          </Button>
        </div>
      )}
    </PageComponent>
  );
}

export default ExercisesPage;
