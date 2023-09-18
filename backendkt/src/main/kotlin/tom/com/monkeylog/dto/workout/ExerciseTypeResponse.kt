package tom.com.monkeylog.dto.workout

import tom.com.monkeylog.model.MetricFormat
import tom.com.monkeylog.model.exercise.ExerciseType

data class ExerciseTypeResponse(
    val id: ExerciseType,
    val name: String,
    val metricFormat: MetricFormat,
)
