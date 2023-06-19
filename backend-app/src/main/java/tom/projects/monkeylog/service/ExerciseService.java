package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.exercise.ExerciseCreateRequest;
import tom.projects.monkeylog.dto.exercise.ExerciseUpdateRequest;
import tom.projects.monkeylog.model.exercise.Exercise;
import tom.projects.monkeylog.model.exercise.ExerciseType;
import tom.projects.monkeylog.repository.exercise.ExerciseRepository;
import tom.projects.monkeylog.repository.exercise.ExerciseTypeRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class ExerciseService {
    private static final String EXERCISE_NOT_FOUND = "Exercise not found";
    private final ExerciseRepository exerciseRepository;
    private final ExerciseTypeRepository exerciseTypeRepository;

    public ExerciseType getExerciseType(Long id) {
        return exerciseTypeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EXERCISE_NOT_FOUND));
    }

    public List<ExerciseType> getExerciseTypes() {
        return exerciseTypeRepository.findAll();
    }

    public List<Exercise> all() {
        return exerciseRepository.findAllByUserId(AuthenticatedUser.getId());
    }

    public Exercise get(Long id) {
        return exerciseRepository.findById(id)
                .filter(AuthenticatedUser::isOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EXERCISE_NOT_FOUND));
    }

    public Stream<Exercise> allById(Set<Long> ids) {
        return exerciseRepository.findAllById(ids).stream().filter(AuthenticatedUser::isOwner);
    }

    public Exercise save(ExerciseCreateRequest exerciseCreateRequest) {
        Exercise exercise = new Exercise();
        exercise.setUserId(AuthenticatedUser.getId());
        exercise.setName(exerciseCreateRequest.getName());
        exercise.setExerciseType(getExerciseType(exerciseCreateRequest.getExerciseTypeId()));

        return exerciseRepository.save(exercise);
    }

    public Exercise update(ExerciseUpdateRequest exerciseUpdateRequest, Long id) {
        Exercise exercise = get(id);
        exercise.setName(exerciseUpdateRequest.getName());

        return exerciseRepository.save(exercise);
    }

    public void delete(Long id) {
        exerciseRepository.delete(get(id));
    }
}
