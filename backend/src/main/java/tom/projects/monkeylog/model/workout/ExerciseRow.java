package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Entity
@Data
@NoArgsConstructor
public class ExerciseRow implements UserOwned {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private Boolean isLifted;

    @ManyToOne
    @JoinColumn(name = "exercise_group_id", nullable = false)
    private ExerciseGroup exerciseGroup;

    @OneToMany(mappedBy = "exerciseRow", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseRowField> exerciseRowFields = new ArrayList<>();

    public static ExerciseRow clone(ExerciseRow exerciseRow) {
        ExerciseRow newExerciseRow = new ExerciseRow();
        newExerciseRow.setIsLifted(false);
        newExerciseRow.setExerciseGroup(exerciseRow.getExerciseGroup());
        newExerciseRow.addExerciseRowFields(exerciseRow.getExerciseRowFields().stream().map(ExerciseRowField::clone));

        return newExerciseRow;
    }

    public static ExerciseRow first(ExerciseGroup exerciseGroup, boolean isLifted) {
        ExerciseRow exerciseRow = new ExerciseRow();
        exerciseRow.setIsLifted(isLifted);
        exerciseRow.setExerciseGroup(exerciseGroup);
        exerciseRow.addExerciseRowFields(
                exerciseGroup.getExercise().getExerciseCategory().getTypes().stream().map(exerciseType -> {
                    ExerciseRowField exerciseRowField = new ExerciseRowField();
                    exerciseRowField.setExerciseType(exerciseType);

                    return exerciseRowField;
                }));

        return exerciseRow;
    }

    public void addExerciseRowField(ExerciseRowField exerciseRowField) {
        exerciseRowFields.add(exerciseRowField);
        exerciseRowField.setExerciseRow(this);
    }

    public void addExerciseRowFields(Stream<ExerciseRowField> exerciseRowFields) {
        exerciseRowFields.forEach(this::addExerciseRowField);
    }

    @Override
    public UUID getUserId() {
        return exerciseGroup.getUserId();
    }
}