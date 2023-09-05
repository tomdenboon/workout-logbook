package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.exercise.ExerciseType;

import java.util.UUID;

@Data
public class ExerciseRowFieldResponse {
    @NotNull
    private UUID id;
    private Double value;
    @NotNull
    private ExerciseType exerciseType;
}
