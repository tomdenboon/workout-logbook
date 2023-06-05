package tom.projects.monkeylog.dto.workout;

import lombok.Data;

@Data
public class ExerciseRowFieldCreateRequest {
    private Long exerciseFieldId;

    private String value;
}
