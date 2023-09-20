package tom.com.monkeylog.model.exercise

import tom.com.monkeylog.model.MetricFormat

enum class ExerciseType(val niceName: String, val metricFormat: MetricFormat) {
    REPS("Reps", MetricFormat.NUMBER),
    TIME("Time", MetricFormat.TIME),
    DISTANCE("Distance", MetricFormat.DISTANCE),
    WEIGHT("Weight", MetricFormat.WEIGHT);
}
