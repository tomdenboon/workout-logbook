package tom.com.monkeylog.mapper

import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy
import tom.com.monkeylog.dto.workout.ExerciseCategoryResponse
import tom.com.monkeylog.dto.workout.ExerciseResponse
import tom.com.monkeylog.dto.workout.ExerciseTypeResponse
import tom.com.monkeylog.model.exercise.Exercise
import tom.com.monkeylog.model.exercise.ExerciseCategory
import tom.com.monkeylog.model.exercise.ExerciseType

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface ExerciseMapper {
    fun exerciseToExerciseResponse(exercise: Exercise): ExerciseResponse
    fun exercisesToExerciseResponses(exercises: List<Exercise>): List<ExerciseResponse>
    fun exerciseTypeToExerciseTypeResponse(exerciseType: ExerciseType): ExerciseTypeResponse {
        return ExerciseTypeResponse(
            exerciseType,
            exerciseType.name,
            exerciseType.metricFormat
        )
    }

    fun exerciseCategoryToExerciseCategoryResponse(exerciseCategory: ExerciseCategory): ExerciseCategoryResponse {
        return ExerciseCategoryResponse(
            exerciseCategory,
            exerciseCategory.niceName,
            exerciseCategory.types.map(this::exerciseTypeToExerciseTypeResponse).toList()
        )
    }
}
