package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private String phone;
    private String avatar;

}
