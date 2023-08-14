package tom.projects.monkeylog.controller;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.web.servlet.MockMvc;

import tom.projects.monkeylog.common.dto.Page;
import tom.projects.monkeylog.common.mapper.PageMapper;
import tom.projects.monkeylog.mapper.WorkoutMapper;
import tom.projects.monkeylog.model.workout.WorkoutType;
import tom.projects.monkeylog.service.WorkoutService;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;;

@WebMvcTest(value = WorkoutController.class,  excludeAutoConfiguration = {SecurityAutoConfiguration.class})
public class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WorkoutService workoutService;

    @MockBean
    private WorkoutMapper workoutMapper;

    @MockBean
    private PageMapper pageMapper;

    @Test
    public void getAllWorkouts_ReturnsEmptyWorkouts() throws Exception {
        when(workoutService.getWorkouts(WorkoutType.ACTIVE, null, PageRequest.ofSize(1))).thenReturn(new PageImpl<>(List.of()));
        when(pageMapper.map(any(), any())).thenReturn(new Page<>(0, 1, 1, List.of()));
        when(workoutMapper.workoutsToFullWorkoutResponses(List.of())).thenReturn(List.of());

        mockMvc.perform(get("/workouts").param("workoutType", "ACTIVE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(1)));
    }

    @Test
    public void getAllWorkouts_WithAfter_ReturnsEmptyWorkouts() throws Exception {
        when(workoutService.getWorkouts(WorkoutType.ACTIVE, null, PageRequest.ofSize(1))).thenReturn(new PageImpl<>(List.of()));
        when(pageMapper.map(any(), any())).thenReturn(new Page<>(0, 1, 1, List.of()));
        when(workoutMapper.workoutsToFullWorkoutResponses(List.of())).thenReturn(List.of());

        mockMvc.perform(get("/workouts").param("workoutType", "ACTIVE").param("after", "2023-05-01T15:23:45"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size", is(1)));
    }
}