package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import tom.projects.monkeylog.model.exercise.ExerciseType;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseRowField implements UserOwned {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

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
    public UUID getUserId() {
        return exerciseRow.getUserId();
    }
}
