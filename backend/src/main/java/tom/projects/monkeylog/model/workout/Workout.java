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
public class Workout implements UserOwned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clonedFromId;

    private String name;

    private String note;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private WorkoutType workoutType;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @OneToMany(mappedBy = "workout", cascade =  CascadeType.ALL, orphanRemoval = true)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @OrderColumn(name = "sort_order")
    private List<ExerciseGroup> exerciseGroups = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="program_week_id")
    private ProgramWeek programWeek;

    public static Workout clone(Workout workout) {
        Workout newWorkout = new Workout();
        newWorkout.setWorkoutType(WorkoutType.TEMPLATE);
        newWorkout.setName(workout.getName());
        newWorkout.setUserId(workout.getUserId());
        newWorkout.setNote(workout.getNote());
        newWorkout.setWorkoutType(workout.getWorkoutType());
        workout.getExerciseGroups().stream().map(ExerciseGroup::clone).forEach(newWorkout::addExerciseGroup);

        return newWorkout;
    }

    public void addExerciseGroup(ExerciseGroup exerciseGroup) {
        exerciseGroups.add(exerciseGroup);
        exerciseGroup.setWorkout(this);
    }

}