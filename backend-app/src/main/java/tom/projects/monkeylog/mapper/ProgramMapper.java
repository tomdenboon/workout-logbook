package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.program.ProgramResponse;
import tom.projects.monkeylog.model.workout.Program;
import tom.projects.monkeylog.model.workout.Workout;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {WorkoutMapper.class})
public interface ProgramMapper {
    ProgramResponse programToProgramResponse(Program program);
}
