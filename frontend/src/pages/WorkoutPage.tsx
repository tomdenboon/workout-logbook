import { Button, Collapse, Stack, Typography } from '@mui/material';
import FullScreenModal from 'src/components/FullScreenModal';
import SimpleTimer from 'src/components/SimpleTimer';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCompleteWorkoutMutation,
  useGetExerciseCategoriesQuery,
  useLazyGetWorkoutQuery,
} from 'src/store/monkeylogApi';
import { ModalOutlet, useModalOutletContext } from 'src/components/ModalOutlet';
import ExerciseGroupForm from 'src/features/workout/components/ExerciseGroupForm';
import { TransitionGroup } from 'react-transition-group';
import WorkoutKeyboard, {
  WorkoutKeyboardContext,
  useWorkoutKeyboard,
} from 'src/features/workout/components/WorkoutKeyboard';

const TITLE_MAP = {
  COMPLETED: 'Edit workout',
  TEMPLATE: 'Edit workout',
  ACTIVE: 'Active workout',
};

function WorkoutPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const { modalControls } = useModalOutletContext();
  const [completeWorkout] = useCompleteWorkoutMutation();
  const [getWorkout, { data: workout }] = useLazyGetWorkoutQuery();
  const { data: exerciseCategories } = useGetExerciseCategoriesQuery();
  const { next, ...keyboardContext } = useWorkoutKeyboard(workout, exerciseCategories);

  useEffect(() => {
    if (workoutId) {
      getWorkout({ id: workoutId }, true);
    }
  }, [workoutId, getWorkout]);

  return workout && exerciseCategories ? (
    <WorkoutKeyboardContext.Provider value={keyboardContext}>
      <FullScreenModal
        slideUp
        sx={{ pt: 2 }}
        header={{
          title: TITLE_MAP[workout.workoutType],
          rightButton: workout.workoutType === 'ACTIVE' && (
            <Button
              color="inherit"
              variant="text"
              onClick={() => completeWorkout().unwrap().then(modalControls.onClose)}
            >
              Complete
            </Button>
          ),
        }}
        footer={
          keyboardContext.isOpen && (
            <WorkoutKeyboard handleNext={next} setInput={keyboardContext.setInput} />
          )
        }
        // footer={workout?.workoutType === 'ACTIVE' ? <WorkoutFooterActions /> : undefined}
        {...modalControls}
      >
        <Stack>
          <div>
            <Typography>{workout.name}</Typography>
            <Typography>{workout.note}</Typography>
            {workout.workoutType !== 'TEMPLATE' && (
              <SimpleTimer startDate={workout.startDate} endDate={workout.endDate} />
            )}
          </div>
          {workout.exerciseGroups?.length > 0 && (
            <Stack component={TransitionGroup}>
              {workout.exerciseGroups.map((exerciseGroup, index) => (
                <Collapse key={exerciseGroup.id}>
                  <ExerciseGroupForm
                    exerciseGroup={exerciseGroup}
                    exerciseGroupIndex={index}
                    workoutId={workout.id}
                    workoutType={workout.workoutType}
                    exerciseCategories={exerciseCategories}
                  />
                </Collapse>
              ))}
            </Stack>
          )}
          <Button
            variant="outlined"
            sx={{ height: 24, mt: 4 }}
            onClick={() => navigate('exercises')}
          >
            Add exercise
          </Button>
          <Button
            variant="outlined"
            sx={{ height: 24, mt: 4 }}
            color="error"
            onClick={() => navigate('delete')}
          >
            {workout.workoutType === 'ACTIVE' ? 'Cancel workout' : 'Delete workout'}
          </Button>
        </Stack>
        <ModalOutlet />
      </FullScreenModal>
    </WorkoutKeyboardContext.Provider>
  ) : null;
}

export default WorkoutPage;
