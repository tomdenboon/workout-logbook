package tom.com.monkeylog.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .cors { cors ->
                cors.configurationSource(UrlBasedCorsConfigurationSource().apply {
                    registerCorsConfiguration("/**", CorsConfiguration().apply {
                        allowedOrigins = listOf("*")
                        allowedMethods = listOf("*")
                        allowedHeaders = listOf("*")
                    })
                })
            }
            .csrf { it.disable() }
            .httpBasic { it.disable() }
            .formLogin { it.disable() }
            .authorizeHttpRequests { it.anyRequest().permitAll() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .build()
    }
}
