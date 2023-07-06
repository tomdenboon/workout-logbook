package tom.projects.monkeylog.dto.program;

import jakarta.persistence.OneToMany;
import lombok.Data;
import tom.projects.monkeylog.dto.workout.WorkoutFullResponse;
import tom.projects.monkeylog.dto.workout.WorkoutResponse;
import tom.projects.monkeylog.model.workout.ProgramWeek;
import tom.projects.monkeylog.model.workout.Workout;

import java.util.List;

@Data
public class ProgramWeekResponse {
    private Long id;
    private String name;
}
