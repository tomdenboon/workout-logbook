package tom.projects.monkeylog.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tom.projects.monkeylog.model.user.UserOwned;
import tom.projects.monkeylog.model.workout.ExerciseGroup;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Exercise implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    @OneToMany(mappedBy = "exercise")
    private List<ExerciseGroup> exerciseGroups;
    @ManyToOne
    @JoinColumn(name = "exercise_type_id", nullable = false)
    private ExerciseType exerciseType;
}
