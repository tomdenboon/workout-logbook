package tom.projects.monkeylog.dto.program;

import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.projects.monkeylog.dto.workout.WorkoutFullResponse;
import tom.projects.monkeylog.dto.workout.WorkoutResponse;
import tom.projects.monkeylog.model.workout.ProgramWeek;
import tom.projects.monkeylog.model.workout.Workout;

import java.util.List;
import java.util.UUID;

@Data
public class ProgramWeekResponse {
    @NotNull
    private UUID id;
    @NotNull
    private String name;
}
