package tom.projects.monkeylog.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "exerciseType")
    private List<Exercise> exercises;

    @ManyToMany
    @JoinTable(name = "exercise_type_exercise_field", joinColumns = @JoinColumn(name = "exercise_type_id"), inverseJoinColumns = @JoinColumn(name = "exercise_field_id"))
    private SortedSet<ExerciseField> exerciseFields = new TreeSet<>();
}
