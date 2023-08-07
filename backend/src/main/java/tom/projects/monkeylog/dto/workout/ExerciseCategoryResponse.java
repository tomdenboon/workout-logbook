package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExerciseCategoryResponse {
    @NotEmpty
    private String name;
    @NotNull
    private List<ExerciseTypeResponse> exerciseTypes;
}
