package tom.com.monkeylog.common;

fun <T> T?.notNull() = this ?: throw IllegalArgumentException("Created at is null")