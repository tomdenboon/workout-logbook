package tom.projects.monkeylog.common.mapper;

import org.springframework.stereotype.Component;
import tom.projects.monkeylog.common.dto.Page;

import java.util.List;
import java.util.function.Function;

@Component
public class PageMapper {
    public <T, U> Page<U> map(org.springframework.data.domain.Page<T> page, Function<List<T>, List<U>> mapper) {
        return new Page<>(page.getNumber(), page.getSize(), page.getNumberOfElements(), mapper.apply(page.getContent()));
    }
}
