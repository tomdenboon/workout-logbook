package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ProgramUpdateRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
