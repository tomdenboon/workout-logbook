package tom.com.monkeylog.mapper

import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.ReportingPolicy
import tom.com.monkeylog.dto.workout.*
import tom.com.monkeylog.model.workout.ExerciseGroup
import tom.com.monkeylog.model.workout.ExerciseRow
import tom.com.monkeylog.model.workout.ExerciseRowField
import tom.com.monkeylog.model.workout.Workout

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = [ExerciseMapper::class])
interface WorkoutMapper {
    fun workoutRequestToWorkout(workoutRequest: WorkoutCreateRequest): Workout
    fun workoutToWorkoutResponse(workout: Workout): WorkoutResponse

    @Mapping(source = ".", target = "workout")
    fun workoutToFullWorkoutResponse(workout: Workout): WorkoutFullResponse
    fun workoutsToFullWorkoutResponses(workouts: List<Workout>): List<WorkoutFullResponse>
    fun exerciseGroupToExerciseGroupResponse(exerciseGroup: ExerciseGroup): ExerciseGroupResponse
    fun exerciseRowToExerciseRowResponse(exerciseRow: ExerciseRow): ExerciseRowResponse
    fun exerciseRowFieldToExerciseRowFieldResponse(exerciseRowField: ExerciseRowField): ExerciseRowFieldResponse
}
