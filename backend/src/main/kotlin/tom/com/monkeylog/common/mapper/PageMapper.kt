package tom.com.monkeylog.common.mapper

import tom.com.monkeylog.common.dto.Page

fun <T, U> org.springframework.data.domain.Page<T>.toResponse(mapper: (T) -> U) =
    Page(
        isFirst = isFirst,
        isLast = isLast,
        totalPages = totalPages,
        totalElements = totalElements,
        number = number,
        size = size,
        content = content.map(mapper)
    )