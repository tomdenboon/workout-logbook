package tom.com.monkeylog.common.dto

data class Page<T>(
    val isFirst: Boolean,
    val isLast: Boolean,
    val totalPages: Int,
    val totalElements: Long,
    val number: Int,
    val size: Int,
    val content: List<T>,
)
