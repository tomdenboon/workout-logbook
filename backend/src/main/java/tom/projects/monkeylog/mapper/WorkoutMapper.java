package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.workout.*;
import tom.projects.monkeylog.model.workout.ExerciseGroup;
import tom.projects.monkeylog.model.workout.ExerciseRow;
import tom.projects.monkeylog.model.workout.ExerciseRowField;
import tom.projects.monkeylog.model.workout.Workout;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses={ExerciseMapper.class})
public interface WorkoutMapper {
    Workout workoutRequestToWorkout(WorkoutCreateRequest workoutRequest);

    WorkoutResponse workoutToWorkoutResponse(Workout workout);

    @Mapping(source=".", target="workout")
    WorkoutFullResponse workoutToFullWorkoutResponse(Workout workout);

    List<WorkoutFullResponse> workoutsToFullWorkoutResponses(List<Workout> workouts);

    ExerciseGroupResponse exerciseGroupToExerciseGroupResponse(ExerciseGroup exerciseGroup);

    ExerciseRowResponse exerciseRowToExerciseRowResponse(ExerciseRow exerciseRow);

    ExerciseRowFieldResponse exerciseRowFieldToExerciseRowFieldResponse(ExerciseRowField exerciseRowField);
}
