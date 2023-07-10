package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProgramWeekCreateRequest {
    @NotBlank
    private String name;
}
