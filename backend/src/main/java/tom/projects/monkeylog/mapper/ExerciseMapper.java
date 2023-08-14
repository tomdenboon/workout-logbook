package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.workout.ExerciseCategoryResponse;
import tom.projects.monkeylog.dto.workout.ExerciseResponse;
import tom.projects.monkeylog.dto.workout.ExerciseTypeResponse;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseCategory;
import tom.projects.monkeylog.model.exercise.ExerciseType;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExerciseMapper {
    ExerciseResponse exerciseToExerciseResponse(Exercise exercise);

    List<ExerciseResponse> exercisesToExerciseResponses(List<Exercise> exercises);

    default ExerciseTypeResponse exerciseTypeToExerciseTypeResponse(ExerciseType exerciseType) {
        return ExerciseTypeResponse.builder()
                .id(exerciseType)
                .metricFormat(exerciseType.getMetricFormat())
                .name(exerciseType.getName())
                .build();
    }

    default ExerciseCategoryResponse exerciseCategoryToExerciseCategoryResponse(ExerciseCategory exerciseCategory) {
        return ExerciseCategoryResponse.builder()
                .id(exerciseCategory)
                .exerciseTypes(exerciseCategory.getTypes().stream().map(this::exerciseTypeToExerciseTypeResponse).toList())
                .name(exerciseCategory.getName())
                .build();
    }
}
