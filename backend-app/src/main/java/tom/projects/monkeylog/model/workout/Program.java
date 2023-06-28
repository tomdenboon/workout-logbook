package tom.projects.monkeylog.model.workout;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tom.projects.monkeylog.model.user.UserOwned;

import java.time.LocalDateTime;
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
    private String name;
    private String description;
    private boolean isTemplate;

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
