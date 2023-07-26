package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.workout.WorkoutCreateRequest;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.repository.workout.WorkoutRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private static final String WORKOUT_NOT_FOUND = "Workout not found.";
    private final WorkoutRepository workoutRepository;
    private final WorkoutMapper workoutMapper;
    private final ProgramService programService;

    public Page<Workout> getWorkouts(Type type, LocalDateTime after, Pageable pageable) {
        if (after != null) {
            return workoutRepository.findAllByTypeAndUserIdAndStartDateAfter(Type.COMPLETED, AuthenticatedUser.getId(), after, pageable);
        }

        return workoutRepository.findAllByTypeAndUserId(Type.COMPLETED, AuthenticatedUser.getId(), pageable);
    }


    public Workout getWorkout(Long id) {
        return workoutRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Workout getActiveWorkout() {
        return workoutRepository.findAllByTypeAndUserId(Type.ACTIVE, AuthenticatedUser.getId()).stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
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
        workout.setType(Type.ACTIVE);
        workout.setUserId(AuthenticatedUser.getId());

        clearActive();

        return workoutRepository.save(workout);
    }

    private void clearActive() {
        workoutRepository
                .deleteAll(workoutRepository.findAllByTypeAndUserId(Type.ACTIVE, AuthenticatedUser.getId()));
    }

    public Workout complete() {
        Workout workout = workoutRepository.findAllByTypeAndUserId(Type.ACTIVE, AuthenticatedUser.getId())
                .stream().findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));

        workout.getExerciseGroups().forEach(
                exerciseGroup -> exerciseGroup.getExerciseRows().removeIf(exerciseRow -> !exerciseRow.getIsLifted()));
        workout.getExerciseGroups().removeIf(exerciseGroup -> exerciseGroup.getExerciseRows().isEmpty());
        workout.setEndDate(LocalDateTime.now());
        workout.setType(Type.COMPLETED);

        return workoutRepository.save(workout);
    }

    public Workout cloneToTemplate(Long id) {
        Workout workout = getWorkout(id);
        Workout newWorkout = Workout.clone(workout);
        newWorkout.setName(workout.getName() + " - copy");
        newWorkout.setType(Type.TEMPLATE);
        newWorkout.setUserId(AuthenticatedUser.getId());

        return workoutRepository.save(newWorkout);
    }

    public Workout save(WorkoutCreateRequest workoutRequest) {
        Workout workout = workoutMapper.workoutRequestToWorkout(workoutRequest);
        workout.setType(Type.TEMPLATE);
        workout.setUserId(AuthenticatedUser.getId());
        workout.setProgramWeek(workoutRequest.getProgramWeekId() == null ? null : programService.getProgramWeek(workoutRequest.getProgramWeekId()));

        return workoutRepository.save(workout);
    }

    public void delete(Long id) {
        workoutRepository.delete(getWorkout(id));
    }
}