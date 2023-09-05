package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ProgramResponse {
    @NotNull
    List<ProgramWeekResponse> programWeeks;
    @NotNull
    private UUID id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
