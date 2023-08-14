package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseType;
import tom.projects.monkeylog.model.user.UserOwned;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseRowField implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_row_id", nullable = false)
    private ExerciseRow exerciseRow;

    private Double value;

    @Enumerated(EnumType.STRING)
    private ExerciseType exerciseType;

    public static ExerciseRowField clone(ExerciseRowField exerciseRowField) {
        ExerciseRowField newExerciseRowField = new ExerciseRowField();
        newExerciseRowField.setExerciseType(exerciseRowField.getExerciseType());
        newExerciseRowField.setValue(exerciseRowField.getValue());

        return newExerciseRowField;
    }

    @Override
    public Long getUserId() {
        return exerciseRow.getUserId();
    }
}
