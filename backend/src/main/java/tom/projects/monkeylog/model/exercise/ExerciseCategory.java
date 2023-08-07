package tom.projects.monkeylog.model.exercise;

import java.util.List;

public enum ExerciseCategory {
    REPS("Reps", List.of(ExerciseType.REPS)),
    WEIGHTED("Weighted", List.of(ExerciseType.REPS, ExerciseType.WEIGHT)),
    DURATION("Duration", List.of(ExerciseType.TIME)),
    DISTANCE("Distance", List.of(ExerciseType.DISTANCE, ExerciseType.TIME));

    private final String name;
    private final List<ExerciseType> types;

    ExerciseCategory(String name, List<ExerciseType> types) {
        this.name = name;
        this.types = types;
    }

    public String getName() {
        return name;
    }

    public List<ExerciseType> getTypes() {
        return types;
    }
}
