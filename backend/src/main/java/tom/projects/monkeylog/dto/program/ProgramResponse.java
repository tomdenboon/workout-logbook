package tom.projects.monkeylog.dto.program;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.model.workout.ProgramWeek;

import java.util.List;

@Data
public class ProgramResponse {
    @NotNull
    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
    @NotNull
    List<ProgramWeekResponse> programWeeks;
}
