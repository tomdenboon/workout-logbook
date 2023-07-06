package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
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

    public List<Workout> all(Type type) {
        return workoutRepository.findAllByTypeAndUserId(type, AuthenticatedUser.getId());
    }

    public List<Workout> allByProgramWeekId(Long id) {
        return programService.getProgramWeek(id).getWorkouts();
    }

    public Workout get(Long id) {
        return workoutRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Workout getActive() {
        return workoutRepository.findAllByTypeAndUserId(Type.ACTIVE, AuthenticatedUser.getId()).stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, WORKOUT_NOT_FOUND));
    }

    public Workout start() {
        Workout workout = new Workout();
        workout.setName("New empty workout");

        return start(workout);
    }

    public Workout start(Long id) {
        return start(Workout.clone(get(id)));
    }

    private Workout start(Workout workout) {
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
        Workout workout = get(id);
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
        workoutRepository.delete(get(id));
    }
}