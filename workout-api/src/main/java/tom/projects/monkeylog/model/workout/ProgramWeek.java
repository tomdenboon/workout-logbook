package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class ProgramWeek {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @Column(name = "program_id")
    private Program prorgam;

    @OneToMany(mappedBy = "programWeek")
    private List<Workout> workouts = new ArrayList<>();
}
