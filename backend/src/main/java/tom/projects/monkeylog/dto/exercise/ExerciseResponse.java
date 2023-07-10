package tom.projects.monkeylog.dto.exercise;

import lombok.Data;

@Data
public class ExerciseResponse {
    private Long id;
    private String name;
    private ExerciseTypeResponse exerciseType;
}