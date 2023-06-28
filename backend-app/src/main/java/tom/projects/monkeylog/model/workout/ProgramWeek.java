package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProgramWeek {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "program_id")
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
}
