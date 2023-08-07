package tom.projects.monkeylog.model.exercise;

import tom.projects.monkeylog.model.MetricFormat;

public enum ExerciseType {
    REPS("Reps", MetricFormat.NUMBER),
    TIME("Time", MetricFormat.TIME),
    DISTANCE("Distance", MetricFormat.DISTANCE),
    WEIGHT("Weight", MetricFormat.WEIGHT);

    private final String name;
    private final MetricFormat metricFormat;

    ExerciseType(String name, MetricFormat metricFormat) {
        this.name = name;
        this.metricFormat = metricFormat;
    }

    public String getName() {
        return name;
    }

    public MetricFormat getMetricFormat() {
        return metricFormat;
    }

}
