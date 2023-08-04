package tom.projects.monkeylog.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tom.projects.monkeylog.model.MetricFormat;
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

    private String name;

    @Enumerated(EnumType.STRING)
    private MetricFormat metricFormat;

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