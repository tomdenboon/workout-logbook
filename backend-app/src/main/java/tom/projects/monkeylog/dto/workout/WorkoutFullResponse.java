package tom.projects.monkeylog.dto.workout;

import lombok.Data;
import tom.projects.monkeylog.model.workout.Workout;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkoutFullResponse {
    private Long id;

    private String name;

    private String note;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private List<ExerciseGroupResponse> exerciseGroups;

    private Workout.Type type;
}
