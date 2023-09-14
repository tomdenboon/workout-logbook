import { Add, ArrowBack } from '@mui/icons-material';
import { Divider, Fab, IconButton, List, ListSubheader } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import ExerciseCard from 'src/features/workout/components/ExerciseCard';
import ExerciseForm from 'src/features/workout/components/ExerciseForm';
import useSelectIds from 'src/hooks/useSelectIds';
import useAddExercises from 'src/features/workout/hooks/useAddExercises';
import useExercises from 'src/features/workout/hooks/useExercises';
import { Link, useParams } from 'react-router-dom';
import useEditExerciseModal from 'src/features/workout/hooks/useEditExerciseModal';

function Exercises() {
  const { workoutId } = useParams();
  const {
    idMap: selectedExerciseIds,
    toIdList,
    hasSelection: hasSelectedExercises,
    toggleId: exerciseClicked,
  } = useSelectIds();
  const { groupedExercises } = useExercises();
  const { isOpen, openEmpty, openWithExercise, close, editExercise } =
    useEditExerciseModal();
  const { add } = useAddExercises();

  return (
    <AppContainer
      header={{
        leftButton: workoutId && (
          <IconButton
            component={Link}
            to={`/training/workouts/${workoutId}`}
            color="inherit"
          >
            <ArrowBack />
          </IconButton>
        ),
        rightButton: (
          <IconButton onClick={openEmpty} color="inherit">
            <Add />
          </IconButton>
        ),
        title: 'Exercises',
      }}
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
                      onClick={
                        workoutId
                          ? () => exerciseClicked(exercise.id)
                          : undefined
                      }
                      onEdit={() => openWithExercise(exercise)}
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
          onClick={() => add(workoutId, toIdList())}
          disabled={!hasSelectedExercises}
        >
          <Add />
        </Fab>
      )}

      {isOpen && (
        <ExerciseForm isOpen={isOpen} close={close} exercise={editExercise} />
      )}
    </AppContainer>
  );
}

export default Exercises;
