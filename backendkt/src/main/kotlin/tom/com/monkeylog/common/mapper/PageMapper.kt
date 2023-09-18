package tom.com.monkeylog.common.mapper

import org.springframework.stereotype.Component
import tom.com.monkeylog.common.dto.Page

@Component
class PageMapper {
    fun <T, U> map(page: org.springframework.data.domain.Page<T>, mapper: (List<T>) -> List<U>): Page<U> {
        return Page(page.number, page.size, page.numberOfElements, mapper(page.content))
    }
}
