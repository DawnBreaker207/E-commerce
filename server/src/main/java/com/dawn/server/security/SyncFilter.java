package com.dawn.server.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dawn.server.constrant.enums.Gender;
import com.dawn.server.model.User;
import com.dawn.server.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class SyncFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	    throws ServletException, IOException {
	Authentication auth = SecurityContextHolder.getContext().getAuthentication();

	if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof Jwt jwt) {
	    try {

		String sub = jwt.getSubject();

		if (sub == null || sub.isBlank()) {
		    filterChain.doFilter(request, response);
		    return;
		}

		if (!userRepository.existsById(sub)) {
		    String email = jwt.getClaimAsString("email");
		    String firstname = jwt.getClaimAsString("given_name");
		    String lastname = jwt.getClaimAsString("family_name");
		    String genderStr = jwt.getClaimAsString("gender");
		    Gender gender = Gender.OTHER;
		    if (genderStr != null) {
			try {
			    gender = Gender.valueOf(genderStr.toUpperCase());

			} catch (IllegalArgumentException e) {
			    log.warn("Unknown gender value in token: {}", genderStr);
			}
		    }

		    User user = User.builder().userId(sub).email(email).firstname(firstname).lastname(lastname)
			    .gender(gender).build();
		    userRepository.save(user);
		}
	    } catch (NumberFormatException e) {
		log.warn("Failed to sync user from token: {}", e.getMessage());
	    } catch (IllegalArgumentException e) {
		log.warn("Failed to sync user from token: {}", e.getMessage());
	    }
	}

	filterChain.doFilter(request, response);
    }
}
