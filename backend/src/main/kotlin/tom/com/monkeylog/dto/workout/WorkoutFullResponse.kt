package tom.com.monkeylog.dto.workout

import com.fasterxml.jackson.annotation.JsonUnwrapped

data class WorkoutFullResponse(
    @field:JsonUnwrapped var workout: WorkoutResponse,
    var exerciseGroups: List<ExerciseGroupResponse>,
)
