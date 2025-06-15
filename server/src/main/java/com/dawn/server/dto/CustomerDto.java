package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;

import com.dawn.server.constrant.enums.CustomerType;
import com.dawn.server.constrant.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String customerId;
    
    private String email;
    
    private String firstName;
    
    private String lastName;
    
    private Gender gender;
    
    private String phone;
    
    private CustomerType type;
}
