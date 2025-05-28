package com.dawn.server.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

public class RoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
	Map<String, Object> realmAccess = jwt.getClaim("realm_access");

	if (realmAccess == null || realmAccess.isEmpty()) {
	    return Collections.emptyList();
	}

	Collection<GrantedAuthority> authories = new ArrayList<>();
	List<String> roles = (List<String>) realmAccess.get("roles");

	if (roles != null) {
	    for (String role : roles) {
		authories.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
	    }

	}
	return authories;
    }
}
