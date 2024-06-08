package tom.com.workout.logbook.dto.workout

import com.fasterxml.jackson.annotation.JsonUnwrapped

data class ExerciseGroupWithWorkoutResponse(
    @JsonUnwrapped
    val exerciseGroup: ExerciseGroupResponse,
    val workout: WorkoutResponse
)
