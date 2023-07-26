package tom.projects.monkeylog.dto.workout;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ExerciseRowCreateRequest {
    @NotNull
    private List<ExerciseRowFieldCreateRequest> exerciseRowFields;
}
