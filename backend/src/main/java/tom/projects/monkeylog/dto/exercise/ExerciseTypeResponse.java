package tom.projects.monkeylog.dto.exercise;

import lombok.Data;

import java.util.List;

@Data
public class ExerciseTypeResponse {
    private Long id;
    private String name;
    private List<ExerciseFieldResponse> exerciseFields;
}
