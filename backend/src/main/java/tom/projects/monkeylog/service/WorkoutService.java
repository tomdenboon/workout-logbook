package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.workout.WorkoutCreateRequest;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.WorkoutType;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.repository.workout.WorkoutRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class WorkoutService {
    private static final String WORKOUT_NOT_FOUND = "Workout not found.";
    private final WorkoutRepository workoutRepository;
    private final WorkoutMapper workoutMapper;
    private final ProgramService programService;

    public Page<Workout> getWorkouts(WorkoutType workoutType, LocalDateTime after, Pageable pageable) {
        if (after != null) {
            return workoutRepository.findAllByWorkoutTypeAndUserIdAndStartDateAfter(workoutType, AuthenticatedUser.getId(), after, pageable);
        }

        return workoutRepository.findAllByWorkoutTypeAndUserId(workoutType, AuthenticatedUser.getId(), pageable);
    }

    public Workout getWorkout(Long id) {
        return workoutRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Optional<Workout> getActiveWorkout() {
        return workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.getId()).stream()
                .findFirst();
    }

    public Workout startWorkout() {
        Workout workout = new Workout();
        workout.setName("New empty workout");

        return startWorkout(workout);
    }

    public Workout startWorkout(Long id) {
        return startWorkout(Workout.clone(getWorkout(id)));
    }

    private Workout startWorkout(Workout workout) {
        workout.setStartDate(LocalDateTime.now());
        workout.setWorkoutType(WorkoutType.ACTIVE);
        workout.setUserId(AuthenticatedUser.getId());

        clearActive();

        return workoutRepository.save(workout);
    }

    private void clearActive() {
        workoutRepository
                .deleteAll(workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.getId()));
    }

    public Workout complete() {
        Workout workout = workoutRepository.findAllByWorkoutTypeAndUserId(WorkoutType.ACTIVE, AuthenticatedUser.getId())
                .stream().findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));

        workout.getExerciseGroups().forEach(
                exerciseGroup -> exerciseGroup.getExerciseRows().removeIf(exerciseRow -> !exerciseRow.getIsLifted()));
        workout.getExerciseGroups().removeIf(exerciseGroup -> exerciseGroup.getExerciseRows().isEmpty());
        workout.setEndDate(LocalDateTime.now());
        workout.setWorkoutType(WorkoutType.COMPLETED);

        return workoutRepository.save(workout);
    }

    public Workout cloneToTemplate(Long id) {
        Workout workout = getWorkout(id);
        Workout newWorkout = Workout.clone(workout);
        newWorkout.setName(workout.getName() + " - copy");
        newWorkout.setWorkoutType(WorkoutType.TEMPLATE);
        newWorkout.setUserId(AuthenticatedUser.getId());

        return workoutRepository.save(newWorkout);
    }

    public Workout save(WorkoutCreateRequest workoutRequest) {
        Workout workout = workoutMapper.workoutRequestToWorkout(workoutRequest);
        workout.setWorkoutType(WorkoutType.TEMPLATE);
        workout.setUserId(AuthenticatedUser.getId());
        workout.setProgramWeek(workoutRequest.getProgramWeekId() == null ? null : programService.getProgramWeek(workoutRequest.getProgramWeekId()));

        return workoutRepository.save(workout);
    }

    public void delete(Long id) {
        workoutRepository.delete(getWorkout(id));
    }
}