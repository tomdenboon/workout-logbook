package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class ExerciseGroupCreateRequest {
    @NotEmpty
    private Set<Long> exerciseIds;
}
