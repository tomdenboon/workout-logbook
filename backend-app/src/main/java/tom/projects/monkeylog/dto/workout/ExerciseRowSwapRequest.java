package tom.projects.monkeylog.dto.workout;

import lombok.Data;

@Data
public class ExerciseRowSwapRequest {
    private int oldIndex;
    private int newIndex;
}