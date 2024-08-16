import { useNavigate, useParams } from 'react-router-dom';
import { PageOnStack } from '../../../components/Page';
import { Workout } from '../../../model/Workout';
import { TableName } from '../../../model/tables';
import { useDatabase } from '@nozbe/watermelondb/react';
import Button from '../../../components/Button';
import { ExerciseGroup } from '../../../model/ExerciseGroup';
import useSubscribe from '../../../hooks/useSubscribe';
import RootOutlet from '../../../components/RootOutlet';
import { ExerciseRow } from '../../../model/ExerciseRow';
import { VALID_FIELDS } from '../../../model/Exercise';

function ExerciseGroupCard(props: { exerciseGroup: ExerciseGroup }) {
  const { exerciseGroup } = props;
  const database = useDatabase();
  const exercise = useSubscribe(exerciseGroup.exercise.observe());
  const exerciseRows = useSubscribe(exerciseGroup.exerciseRows.observe());

  const addExerciseRow = () => {
    database.write(async () => {
      database.get<ExerciseRow>(TableName.ExerciseRow).create((exerciseRow) => {
        exerciseRow.reps = 10;
        exerciseRow.weight = 100;
        exerciseRow.time = 60;
        exerciseRow.distance = 1000;
        exerciseRow.exerciseGroup.set(exerciseGroup);
      });
    });
  };

  console.log(exerciseRows);

  return exercise && exerciseRows ? (
    <div>
      <div className="text-blue-500">{exercise.name}</div>
      <div className="flex flex-col gap-2">
        {exerciseRows.map((e, i) => (
          <div className="flex gap-2">
            <Button
              size="small"
              onClick={() => null}
              variant="secondary-outlined"
            >
              {i + 1}
            </Button>
            {VALID_FIELDS[exercise.type].map((f) => (
              <div className="flex-1 border">{e[f]}</div>
            ))}
            <Button
              size="small"
              onClick={() => null}
              variant="secondary-outlined"
            >
              Edit
            </Button>
          </div>
        ))}
        <Button
          size="small"
          onClick={addExerciseRow}
          variant="secondary-outlined"
        >
          Add exercise row
        </Button>
      </div>
    </div>
  ) : null;
}

function WorkoutPage() {
  const { workoutId } = useParams();
  const database = useDatabase();
  const navigate = useNavigate();
  const workout = useSubscribe(
    workoutId
      ? database.get<Workout>(TableName.Workout).findAndObserve(workoutId)
      : undefined,
  );
  const exerciseGroups = useSubscribe(workout?.exerciseGroups.observe());

  return (
    <PageOnStack
      header={{
        title: 'test',
      }}
    >
      <RootOutlet />
      {workout ? (
        <div className="flex flex-col gap-4">
          <h1>{workout.name}</h1>
          <p>{workout.note}</p>
          {exerciseGroups?.map((exerciseGroup) => (
            <ExerciseGroupCard exerciseGroup={exerciseGroup} />
          ))}
          <Button
            onClick={() => navigate('exercises')}
            variant="secondary-outlined"
            size="small"
          >
            Add Exercises
          </Button>
          <Button
            onClick={() => navigate('exercises')}
            variant="secondary-outlined"
            size="small"
          >
            Cancel workout
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </PageOnStack>
  );
}

export default WorkoutPage;
