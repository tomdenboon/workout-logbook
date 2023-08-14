package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseGroup implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @OneToMany(mappedBy = "exerciseGroup", cascade =  CascadeType.ALL, orphanRemoval = true)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ExerciseRow> exerciseRows = new ArrayList<>();

    public static ExerciseGroup clone(ExerciseGroup exerciseGroup) {
        ExerciseGroup newExerciseGroup = new ExerciseGroup();
        newExerciseGroup.setExercise(exerciseGroup.getExercise());
        newExerciseGroup.addExerciseRows(exerciseGroup.getExerciseRows().stream().map(ExerciseRow::clone));

        return newExerciseGroup;
    }

    public void addExerciseRow(ExerciseRow exerciseRow) {
        exerciseRows.add(exerciseRow);
        exerciseRow.setExerciseGroup(this);
    }

    public void addExerciseRows(Stream<ExerciseRow> exerciseRows) {
        exerciseRows.forEach(this::addExerciseRow);
    }

    @Override
    public Long getUserId() {
        return workout.getUserId();
    }
}