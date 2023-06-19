package tom.projects.monkeylog.dto.workout;

import lombok.Data;
import tom.projects.monkeylog.dto.exercise.ExerciseFieldResponse;

@Data
public class ExerciseRowFieldResponse {
    private Long id;

    private ExerciseFieldResponse exerciseField;

    private String value;
}
