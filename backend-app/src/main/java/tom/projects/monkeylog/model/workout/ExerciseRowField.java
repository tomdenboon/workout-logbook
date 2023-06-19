package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tom.projects.monkeylog.model.exercise.ExerciseField;
import tom.projects.monkeylog.model.user.UserOwned;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseRowField implements UserOwned, Comparable<ExerciseRowField> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_row_id", nullable = false)
    private ExerciseRow exerciseRow;

    @ManyToOne
    @JoinColumn(name = "exercise_field_id", nullable = false)
    private ExerciseField exerciseField;

    private String value;

    public static ExerciseRowField clone(ExerciseRowField exerciseRowField) {
        ExerciseRowField newExerciseRowField = new ExerciseRowField();
        newExerciseRowField.setExerciseField(exerciseRowField.getExerciseField());
        newExerciseRowField.setValue(exerciseRowField.getValue());

        return newExerciseRowField;
    }

    @Override
    public Long getUserId() {
        return exerciseRow.getUserId();
    }

    @Override
    public int compareTo(ExerciseRowField exerciseRowField) {
        return this.getExerciseField().compareTo(exerciseRowField.getExerciseField());
    }
}
