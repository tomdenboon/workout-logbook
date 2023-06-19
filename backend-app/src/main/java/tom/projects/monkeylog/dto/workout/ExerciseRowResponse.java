package tom.projects.monkeylog.dto.workout;

import lombok.Data;

import java.util.List;

@Data
public class ExerciseRowResponse {
    private Long id;

    private List<ExerciseRowFieldResponse> exerciseRowFields;

    private Boolean isLifted;
}
