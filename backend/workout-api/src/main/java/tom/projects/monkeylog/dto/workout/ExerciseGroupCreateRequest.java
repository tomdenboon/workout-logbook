package tom.projects.monkeylog.dto.workout;

import lombok.Data;

import java.util.Set;

@Data
public class ExerciseGroupCreateRequest {
    private Set<Long> exerciseIds;
}
