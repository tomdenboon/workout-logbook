package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseCategory;

import java.util.UUID;

@Data
public class ExerciseResponse {
    @NotNull
    private UUID id;
    @NotBlank
    private String name;
    @NotNull
    private ExerciseCategoryResponse exerciseCategory;
}