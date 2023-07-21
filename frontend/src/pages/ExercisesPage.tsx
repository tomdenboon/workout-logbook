import { ArrowBack } from '@mui/icons-material';
import { Divider, Fab, IconButton, List, ListSubheader } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetExercisesQuery } from 'services/exerciseApi';
import { useAddExerciseGroupsMutation } from 'services/monkeylogApi';
import { Exercise } from 'features/workout/types';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import ExerciseCard from 'features/workout/components/ExerciseCard';
import ExerciseForm from 'features/workout/components/ExerciseForm';

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
    <AppContainer
      header={
        <AppHeader
          LeftTitleButton={
            workoutId && (
              <IconButton component={Link} to={`/training/workouts/${workoutId}`} color="inherit">
                <ArrowBack />
              </IconButton>
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
    </AppContainer>
  );
}

export default Exercises;
