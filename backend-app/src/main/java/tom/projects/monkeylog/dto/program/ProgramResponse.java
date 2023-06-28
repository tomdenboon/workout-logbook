package tom.projects.monkeylog.dto.program;

import lombok.Data;
import tom.projects.monkeylog.model.workout.ProgramWeek;

import java.util.List;

@Data
public class ProgramResponse {
    private String name;
    private String description;
    private boolean isTemplate;
    List<ProgramWeek> programWeeks;
}
