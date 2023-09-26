package tom.com.monkeylog.common.dto

data class Page<T>(
    val number: Int,
    val size: Int,
    val numberOfElements: Int,
    val content: List<T>,
)
