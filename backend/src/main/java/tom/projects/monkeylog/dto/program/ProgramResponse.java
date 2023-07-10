package tom.projects.monkeylog.dto.program;

import lombok.Data;
import tom.projects.monkeylog.model.workout.ProgramWeek;

import java.util.List;

@Data
public class ProgramResponse {
    private Long id;
    private String name;
    private String description;
    List<ProgramWeekResponse> programWeeks;
}
