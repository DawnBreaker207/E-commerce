package com.dawn.server.helper;

import com.dawn.server.dto.UserDto;
import com.dawn.server.model.User;

public interface UserMappingHelper {
 static UserDto map(final User user) {
	return UserDto.builder()
		    .userId(user.getUserId())
		    .email(user.getEmail())
		    .firstname(user.getFirstname())
		    .lastname(user.getLastname())
		    .avatar(user.getAvatarUrl())
		    .phone(user.getPhone())
		    .build();
    }
 
 static User map(final UserDto userDto) {
     return User.builder()
	     	.userId(userDto.getUserId())
	     	.email(userDto.getEmail())
	     	.firstname(userDto.getFirstname())
	     	.lastname(userDto.getLastname())
	     	.avatarUrl(userDto.getAvatar())
	     	.phone(userDto.getPhone())
	     	.build();
 }
 
}
