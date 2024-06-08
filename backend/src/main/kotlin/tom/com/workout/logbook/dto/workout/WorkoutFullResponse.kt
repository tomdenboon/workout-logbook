package tom.com.workout.logbook.dto.workout

import com.fasterxml.jackson.annotation.JsonUnwrapped

data class WorkoutFullResponse(
    @JsonUnwrapped var workout: WorkoutResponse,
    var exerciseGroups: List<ExerciseGroupResponse>,
)
