package com.dawn.server.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dawn.server.security.RoleConverter;
import com.dawn.server.security.SyncFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true, securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final String[] PUBLIC_GET = { "/api/product/**", "/api/category/**","/api/orders/**" };

    private final String[] PUBLIC_ALL = { "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**",
	    "/swagger-resources/**", "/api-docs/**", "/aggregate/**", "/actuator/prometheus","/api/orders/**" 

    };

    private final SyncFilter syncFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	return http
		.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, PUBLIC_GET).permitAll()
			.requestMatchers(PUBLIC_ALL).permitAll().anyRequest().authenticated())
		.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
//		.oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults())).build();
		.oauth2ResourceServer(
			oauth -> oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
		.addFilterAfter(syncFilter, BearerTokenAuthenticationFilter.class).build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
	JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();

	jwtConverter.setJwtGrantedAuthoritiesConverter(new RoleConverter());

	return jwtConverter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
	CorsConfiguration config = new CorsConfiguration();
	config.applyPermitDefaultValues();
	config.setAllowedOrigins(List.of("http://localhost:4200"));
	config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
	config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
	config.setAllowCredentials(true);
	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", config);
	return source;
    }
}
