package com.dawn.server.service.Impl;

import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import com.dawn.server.model.User;
import com.dawn.server.repository.UserRepository;
import com.dawn.server.service.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getLoggedUser() {
	JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

	String email = String.valueOf(token.getTokenAttributes().get("email"));
	User user = userRepository.findByEmail(email)
		.orElseThrow(() -> new EntityNotFoundException("Error while fetching user"));

	return user;
    }

    @Override
    public void syncUser(User user) {
	if (user == null) {
	    throw new EntityNotFoundException("Error while user sync");

	}

	User savedUser = user;
	Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

	if (optionalUser.isPresent()) {
	    savedUser = optionalUser.get();
	    savedUser.setFirstname(user.getFirstname());
	    savedUser.setLastname(user.getLastname());
	}

	userRepository.save(savedUser);

    }
}
