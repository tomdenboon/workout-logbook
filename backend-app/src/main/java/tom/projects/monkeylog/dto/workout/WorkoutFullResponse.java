package tom.projects.monkeylog.dto.workout;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;
import tom.projects.monkeylog.model.workout.Type;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkoutFullResponse {
    @JsonUnwrapped
    private WorkoutResponse workout;
    private List<ExerciseGroupResponse> exerciseGroups;
}
