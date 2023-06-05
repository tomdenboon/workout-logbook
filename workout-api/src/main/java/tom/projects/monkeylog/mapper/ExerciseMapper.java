package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.exercise.ExerciseResponse;
import tom.projects.monkeylog.dto.exercise.ExerciseTypeResponse;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseType;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExerciseMapper {
    ExerciseResponse exerciseToExerciseResponse(Exercise exercise);

    List<ExerciseResponse> exercisesToExerciseResponses(List<Exercise> exercises);

    ExerciseTypeResponse exerciseTypeToExerciseTypeResponse(ExerciseType exerciseType);

    List<ExerciseTypeResponse> exerciseTypesToExerciseTypeResponses(List<ExerciseType> exerciseTypes);
}
