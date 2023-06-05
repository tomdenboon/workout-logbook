package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.workout.WorkoutRequest;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.repository.workout.WorkoutRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private static final String WORKOUT_NOT_FOUND = "Workout not found.";
    private final WorkoutRepository workoutRepository;
    private final WorkoutMapper workoutMapper;

    public List<Workout> all(Workout.Type type) {
        return workoutRepository.findAllByTypeAndUserId(type, AuthenticatedUser.getId());
    }

    public Workout get(Long id) {
        return workoutRepository.findById(id)
                .filter(AuthenticatedUser::isOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Workout getActive() {
        return workoutRepository.findAllByTypeAndUserId(Workout.Type.ACTIVE, AuthenticatedUser.getId()).stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Object count(LocalDate start, LocalDate end) {
        return workoutRepository.findByEndDateBetween(start.atStartOfDay(), end.plusDays(1).atStartOfDay());
    }

    public Workout start() {
        Workout workout = new Workout();
        workout.setName("New empty workout");

        return start(workout);
    }

    public Workout start(Long id) {
        Workout newWorkout = Workout.clone(get(id));

        return start(newWorkout);
    }

    private Workout start(Workout workout) {
        workout.setStartDate(LocalDateTime.now());
        workout.setType(Workout.Type.ACTIVE);
        workout.setUserId(AuthenticatedUser.getId());

        clearActive();

        return workoutRepository.save(workout);
    }

    private void clearActive() {
        workoutRepository
                .deleteAll(workoutRepository.findAllByTypeAndUserId(Workout.Type.ACTIVE, AuthenticatedUser.getId()));
    }

    public Workout complete() {
        Workout workout = workoutRepository.findAllByTypeAndUserId(Workout.Type.ACTIVE, AuthenticatedUser.getId())
                .stream().findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));

        workout.getExerciseGroups().forEach(
                exerciseGroup -> exerciseGroup.getExerciseRows().removeIf(exerciseRow -> !exerciseRow.getIsLifted()));
        workout.getExerciseGroups().removeIf(exerciseGroup -> exerciseGroup.getExerciseRows().isEmpty());
        workout.setEndDate(LocalDateTime.now());
        workout.setType(Workout.Type.COMPLETED);

        return workoutRepository.save(workout);
    }

    public Workout clone(Long id) {
        Workout workout = get(id);
        Workout newWorkout = Workout.clone(workout);
        newWorkout.setName(workout.getName() + " - copy");
        newWorkout.setType(Workout.Type.TEMPLATE);
        newWorkout.setUserId(AuthenticatedUser.getId());

        return workoutRepository.save(newWorkout);
    }

    public Workout save(WorkoutRequest workoutRequest) {
        Workout workout = workoutMapper.workoutRequestToWorkout(workoutRequest);
        workout.setType(Workout.Type.TEMPLATE);
        workout.setUserId(AuthenticatedUser.getId());

        return workoutRepository.save(workout);
    }

    public void delete(Long id) {
        workoutRepository.delete(get(id));
    }
}
