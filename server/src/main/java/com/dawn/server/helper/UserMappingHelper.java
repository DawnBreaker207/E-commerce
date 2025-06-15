package com.dawn.server.helper;

import com.dawn.server.dto.UserDto;
import com.dawn.server.model.User;

public interface UserMappingHelper {
 static UserDto map(final User user) {
	return UserDto.builder()
		    .userId(user.getUserId())
		    .email(user.getEmail())
		    .firstName(user.getFirstname())
		    .lastName(user.getLastname())
		    .avatar(user.getAvatarUrl())
		    .phone(user.getPhone())
		    .build();
    }
 
 static User map(final UserDto userDto) {
     return User.builder()
	     	.userId(userDto.getUserId())
	     	.email(userDto.getEmail())
	     	.firstname(userDto.getFirstName())
	     	.lastname(userDto.getLastName())
	     	.avatarUrl(userDto.getAvatar())
	     	.phone(userDto.getPhone())
	     	.build();
 }
 
}
