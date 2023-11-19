package tom.com.monkeylog.common

fun <T> T?.notNull() = this ?: throw IllegalArgumentException("This parameter can not be null")