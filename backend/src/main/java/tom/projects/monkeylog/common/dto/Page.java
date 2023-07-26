package tom.projects.monkeylog.common.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Slice;

import java.util.List;

@Data
@AllArgsConstructor
public class Page<T> {
    @NotNull
    private Integer number;
    @NotNull
    private Integer size;
    @NotNull
    private Integer numberOfElements;
    @NotNull
    private List<T> content;

}
