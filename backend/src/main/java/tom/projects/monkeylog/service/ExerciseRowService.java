package tom.projects.monkeylog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tom.projects.monkeylog.dto.workout.ExerciseRowFieldUpdateRequest;
import tom.projects.monkeylog.dto.workout.ExerciseRowUpdateRequest;
import tom.projects.monkeylog.model.workout.ExerciseGroup;
import tom.projects.monkeylog.model.workout.ExerciseRow;
import tom.projects.monkeylog.model.workout.ExerciseRowField;
import tom.projects.monkeylog.repository.workout.ExerciseGroupRepository;
import tom.projects.monkeylog.repository.workout.ExerciseRowFieldRepository;
import tom.projects.monkeylog.repository.workout.ExerciseRowRepository;
import tom.projects.monkeylog.security.AuthenticatedUser;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ExerciseRowService {
    private static final String ROW_NOT_FOUND = "Exercise row not found";
    private final ExerciseGroupRepository exerciseGroupRepository;
    private final ExerciseRowRepository exerciseRowRepository;
    private final ExerciseRowFieldRepository exerciseRowFieldRepository;

    public ExerciseRow get(UUID id) {
        return exerciseRowRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ROW_NOT_FOUND));
    }

    public ExerciseRowField getField(UUID id) {
        return exerciseRowFieldRepository.findById(id)
                .filter(AuthenticatedUser::isResourceOwner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ROW_NOT_FOUND));
    }

    public ExerciseRow update(ExerciseRowUpdateRequest exerciseRowUpdateRequest, UUID id) {
        ExerciseRow exerciseRow = get(id);
        exerciseRow.setIsLifted(exerciseRowUpdateRequest.getIsLifted());

        return exerciseRowRepository.save(exerciseRow);
    }

    public ExerciseRowField updateField(ExerciseRowFieldUpdateRequest exerciseRowFieldUpdateRequest,
                                        UUID exerciseRowFieldId) {
        ExerciseRowField exerciseRowField = getField(exerciseRowFieldId);
        exerciseRowField.setValue(exerciseRowFieldUpdateRequest.getValue());

        return exerciseRowFieldRepository.save(exerciseRowField);
    }

    public void delete(UUID id) {
        ExerciseRow exerciseRow = get(id);
        ExerciseGroup exerciseGroup = exerciseRow.getExerciseGroup();
        exerciseGroup.getExerciseRows().remove(exerciseRow);

        if (exerciseGroup.getExerciseRows().size() <= 1) {
            exerciseGroupRepository.delete(exerciseGroup);
        } else {
            exerciseRowRepository.delete(exerciseRow);
        }
    }
}
