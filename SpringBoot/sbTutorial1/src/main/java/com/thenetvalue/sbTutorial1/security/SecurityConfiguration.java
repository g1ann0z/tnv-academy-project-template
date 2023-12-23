package com.thenetvalue.sbTutorial1.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

/*
      @Bean

      public InMemoryUserDetailsManager userDetailsService() {
          UserDetails user = User
                  .withUsername("user")
                  .password(passwordEncoder.encode("user"))
                  .roles("USER")
                  .build();
          UserDetails admin = User
                  .withUsername("admin")
                  .password(passwordEncoder.encode("admin"))
                  .roles("ADMIN")
                  .build();
          return new InMemoryUserDetailsManager(user, admin);
      }
*/

    //Alternativo a metodo sopra
    @Bean    //viene fatto autowired atomatico grazie a @Bean
    public UserDetailsManager users(DataSource dataSource) {
        JdbcUserDetailsManager judm = new JdbcUserDetailsManager(dataSource);//permette di usare libreria jdbc per fare chiamate alle tabelle
/*
        UserDetails user = User

                .withUsername("user")
                .password(passwordEncoder.encode("user"))
                .roles("USER")
                .build();
        UserDetails admin = User
                .withUsername("admin")
                .password(passwordEncoder.encode("admin"))
                .roles("ADMIN")
                .build();


        judm.createUser(user);
        judm.createUser(admin);
*/
        return judm;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/users/**")
                                .permitAll()
                                /*
                                .requestMatchers( "/users/")
                                .permitAll()
                                .requestMatchers( "/users/**")
                                .hasAnyRole("USER", "ADMIN")
                                 */
                                .anyRequest()
                                .authenticated()
                )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowCredentials(false);
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return this.passwordEncoder;
    }
}
