package tom.projects.monkeylog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import tom.projects.monkeylog.dto.measurement.MeasurementUpdateRequest;
import tom.projects.monkeylog.dto.program.*;
import tom.projects.monkeylog.model.measurement.Measurement;
import tom.projects.monkeylog.model.workout.Program;
import tom.projects.monkeylog.model.workout.ProgramWeek;
import tom.projects.monkeylog.model.workout.Workout;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {WorkoutMapper.class})
public interface ProgramMapper {
    ProgramResponse programToProgramResponse(Program program);
    List<ProgramResponse> programListToProgramResponseList(List<Program> programList);
    Program programCreateRequestToProgram(ProgramCreateRequest programCreateRequest);
    void updateProgram(@MappingTarget Program program, ProgramUpdateRequest programUpdateRequest);
    ProgramWeek programWeekCreateRequestToProgramWeek(ProgramWeekCreateRequest programWeekCreateRequest);
    ProgramWeekResponse programWeekToProgramWeekResponse(ProgramWeek programWeek);
}
