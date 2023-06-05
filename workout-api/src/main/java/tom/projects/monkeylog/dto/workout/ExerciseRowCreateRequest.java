package tom.projects.monkeylog.dto.workout;

import lombok.Data;

import java.util.List;

@Data
public class ExerciseRowCreateRequest {
    private List<ExerciseRowFieldCreateRequest> exerciseRowFields;
}
