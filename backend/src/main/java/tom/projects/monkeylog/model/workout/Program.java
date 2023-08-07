package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tom.projects.monkeylog.model.user.UserOwned;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Program implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private WorkoutType workoutType;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<ProgramWeek> programWeeks = new ArrayList<>();

    public Program clone(Program program) {
        Program newProgram = new Program();
        newProgram.setName(program.getName());
        program.getProgramWeeks().stream().map(ProgramWeek::clone).forEach(newProgram::addProgramWeek);

        return newProgram;
    }

    public void addProgramWeek(ProgramWeek programWeek) {
        programWeek.setProgram(this);
        programWeeks.add(programWeek);
    }
}
