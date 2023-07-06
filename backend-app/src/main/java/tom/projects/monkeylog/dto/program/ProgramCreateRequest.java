package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.workout.Type;

@Data
public class ProgramCreateRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
