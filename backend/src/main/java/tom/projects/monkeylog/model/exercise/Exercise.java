package tom.projects.monkeylog.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import tom.projects.monkeylog.model.user.UserOwned;
import tom.projects.monkeylog.model.workout.ExerciseGroup;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Exercise implements UserOwned {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
    private UUID userId;
    private String name;
    @OneToMany(mappedBy = "exercise")
    private List<ExerciseGroup> exerciseGroups;
    @Enumerated(EnumType.STRING)
    private ExerciseCategory exerciseCategory;

}
