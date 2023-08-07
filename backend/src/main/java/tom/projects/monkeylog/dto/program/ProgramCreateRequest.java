package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ProgramCreateRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
