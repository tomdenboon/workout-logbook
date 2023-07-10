package tom.projects.monkeylog.dto.workout;

import lombok.Data;
import tom.projects.monkeylog.dto.exercise.ExerciseResponse;

import java.util.List;

@Data
public class ExerciseGroupResponse {
    private Long id;
    private ExerciseResponse exercise;
    private List<ExerciseRowResponse> exerciseRows;
}
