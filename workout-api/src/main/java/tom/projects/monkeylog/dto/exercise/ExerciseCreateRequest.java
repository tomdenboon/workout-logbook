package tom.projects.monkeylog.dto.exercise;

import lombok.Data;

@Data
public class ExerciseCreateRequest {
    private String name;
    private Long exerciseTypeId;
}