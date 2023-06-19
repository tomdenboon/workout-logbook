package tom.projects.monkeylog.dto.workout;

import lombok.Data;

@Data
public class ExerciseRowUpdateRequest {
    private Boolean isLifted;
    private Integer newIndex;
}