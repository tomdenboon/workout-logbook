package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.workout.ExerciseGroupCreateRequest;
import tom.projects.monkeylog.model.workout.ExerciseGroup;
import tom.projects.monkeylog.model.workout.ExerciseRow;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.model.workout.Workout;
import tom.projects.monkeylog.repository.workout.ExerciseGroupRepository;
import tom.projects.monkeylog.repository.workout.WorkoutRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

@RequiredArgsConstructor
@Service
public class ExerciseGroupService {
    private final ExerciseService exerciseService;
    private final ExerciseGroupRepository exerciseGroupRepository;
    private final WorkoutRepository workoutRepository;
    private final WorkoutService workoutService;

    public ExerciseGroup get(Long id) {
        return exerciseGroupRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise group not found"));
    }

    public ExerciseGroup addRow(Long id) {
        ExerciseGroup exerciseGroup = get(id);
        ExerciseRow exerciseRow = ExerciseRow
                .clone(exerciseGroup.getExerciseRows().get(exerciseGroup.getExerciseRows().size() - 1));
        exerciseRow.setIsLifted(exerciseGroup.getWorkout().getType() == Type.COMPLETED);
        exerciseGroup.addExerciseRow(exerciseRow);

        return exerciseGroupRepository.save(exerciseGroup);
    }

    public void save(ExerciseGroupCreateRequest exerciseGroupCreateRequest, Long workoutId) {
        Workout workout = workoutService.get(workoutId);

        exerciseService.allById(exerciseGroupCreateRequest.getExerciseIds())
                .map(exercise -> {
                    ExerciseGroup exerciseGroup = new ExerciseGroup();
                    exerciseGroup.setExercise(exercise);
                    exerciseGroup.setWorkout(workout);
                    exerciseGroup.addExerciseRow(ExerciseRow.first(exerciseGroup, workout.getType() == Type.COMPLETED));

                    return exerciseGroup;
                }).forEach(workout::addExerciseGroup);

        workoutRepository.save(workout);
    }

    public void delete(Long id) {
        ExerciseGroup exerciseGroup = get(id);
        Workout workout = exerciseGroup.getWorkout();
        workout.getExerciseGroups().remove(exerciseGroup);
        workoutRepository.save(workout);
    }
}
