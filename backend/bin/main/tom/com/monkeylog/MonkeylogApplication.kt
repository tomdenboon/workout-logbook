package tom.com.monkeylog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MonkeylogApplication

fun main(args: Array<String>) {
    runApplication<MonkeylogApplication>(*args)
}
