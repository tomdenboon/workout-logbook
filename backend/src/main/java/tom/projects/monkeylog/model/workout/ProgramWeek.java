package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProgramWeek implements UserOwned {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;
    @OneToMany(mappedBy = "programWeek")
    private List<Workout> workouts;

    public static ProgramWeek clone(ProgramWeek programWeek) {
        ProgramWeek newProgramWeek = new ProgramWeek();
        programWeek.getWorkouts().stream().map(Workout::clone).forEach(newProgramWeek::addWorkout);

        return newProgramWeek;
    }

    public void addWorkout(Workout workout) {
        workout.setProgramWeek(this);
        workouts.add(workout);
    }

    @Override
    public UUID getUserId() {
        return program.getUserId();
    }
}
