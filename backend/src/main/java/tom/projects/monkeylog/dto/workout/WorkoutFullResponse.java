package tom.projects.monkeylog.dto.workout;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class WorkoutFullResponse {
    @JsonUnwrapped
    private WorkoutResponse workout;
    @NotNull
    private List<ExerciseGroupResponse> exerciseGroups;
}
