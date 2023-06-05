package tom.projects.monkeylog.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tom.projects.monkeylog.model.workout.ExerciseRowField;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseField implements Comparable<ExerciseField> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ExerciseFieldType type;

    private Integer sortOrder;

    @OneToMany(mappedBy = "exerciseField")
    private List<ExerciseRowField> exerciseRowFields;

    @ManyToMany(mappedBy = "exerciseFields")
    private List<ExerciseType> exerciseTypes;

    @Override
    public int compareTo(ExerciseField o) {
        return this.getSortOrder() - o.getSortOrder();
    }
}