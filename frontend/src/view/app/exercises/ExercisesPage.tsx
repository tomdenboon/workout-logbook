import { ArrowBack } from '@mui/icons-material';
import { Divider, Fab, IconButton, List, ListSubheader } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetExercisesQuery } from '../../../api/exerciseApi';
import { useAddExerciseGroupsMutation } from '../../../api/monkeylogApi';
import { Exercise } from '../../../types/Exercise';
import AppGridContainer from '../components/AppGridContainer';
import AppHeader from '../components/AppHeader';
import ExerciseCard from './components/ExerciseCard';
import ExerciseForm from './components/ExerciseForm';

function Exercises() {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const [addExerciseGroups, { isSuccess }] = useAddExerciseGroupsMutation();
  const { data: exercises } = useGetExercisesQuery();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<Record<string, boolean>>({});
  const [editExercise, setEditExercise] = useState<Exercise>();
  const [isOpen, setIsOpen] = useState(false);

  const hasSelectedExercises = useMemo(
    () => Object.values(selectedExerciseIds).some((x) => x),
    [selectedExerciseIds]
  );

  const groupedExercises = useMemo(
    () =>
      exercises?.reduce(
        (grouped, exercise) => ({
          ...grouped,
          [exercise.name.toLowerCase().at(0) ?? '-']: [
            ...(grouped[exercise.name.toLowerCase().at(0) ?? '-'] ?? []),
            exercise,
          ],
        }),
        {} as Record<string, Exercise[]>
      ),
    [exercises]
  );

  useEffect(() => {
    if (isSuccess && workoutId) {
      navigate(`/training/workouts/${workoutId}`);
    }
  }, [isSuccess]);

  const exerciseClicked = (exerciseId: number) => {
    const selectedExercise = selectedExerciseIds[exerciseId];
    setSelectedExerciseIds({
      ...selectedExerciseIds,
      [exerciseId]: selectedExercise ? !selectedExercise : true,
    });
  };

  return (
    <AppGridContainer
      header={
        <AppHeader
          LeftTitleButton={
            workoutId && (
              <Link to={`/training/workouts/${workoutId}`}>
                <IconButton color="inherit">
                  <ArrowBack />
                </IconButton>
              </Link>
            )
          }
          RightButton={
            <IconButton
              onClick={() => {
                setEditExercise(undefined);
                setIsOpen(true);
              }}
              color="inherit"
            >
              <FiPlus />
            </IconButton>
          }
          title="Exercises"
        />
      }
      sx={{ px: 0, pt: 6 }}
    >
      {groupedExercises &&
        Object.keys(groupedExercises)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => (
            <>
              <List sx={{ py: 0 }}>
                <ListSubheader>{key.toLocaleUpperCase()}</ListSubheader>
                <Divider />
                {groupedExercises[key].map((exercise, index) => (
                  <>
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      isSelected={selectedExerciseIds[exercise.id]}
                      onClick={workoutId ? () => exerciseClicked(exercise.id) : undefined}
                      onEdit={() => {
                        setEditExercise(exercise);
                        setIsOpen(true);
                      }}
                    />
                    {index !== groupedExercises[key].length - 1 && <Divider />}
                  </>
                ))}
              </List>
              <Divider />
            </>
          ))}

      {workoutId && (
        <Fab
          sx={{ position: 'fixed', bottom: 64, left: 8 }}
          color="primary"
          onClick={() =>
            addExerciseGroups({
              workoutId: parseInt(workoutId, 10),
              body: {
                exerciseIds: Object.keys(selectedExerciseIds)
                  .filter((id) => selectedExerciseIds[id])
                  .map((id) => parseInt(id, 10)),
              },
            })
          }
          disabled={!hasSelectedExercises}
        >
          <FiPlus />
        </Fab>
      )}

      {isOpen && <ExerciseForm isOpen={isOpen} setIsOpen={setIsOpen} exercise={editExercise} />}
    </AppGridContainer>
  );
}

export default Exercises;
