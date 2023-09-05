package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class ExerciseGroupCreateRequest {
    @NotEmpty
    private Set<UUID> exerciseIds;
}
