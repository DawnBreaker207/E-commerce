package com.dawn.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "user_id",nullable = false, updatable = false)
    private String userId;
    
    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String firstname;

    @Column
    private String lastname;

//    @Column
//    @Enumerated(EnumType.STRING)
//    private Gender gender;

    public enum Gender {
	MALE, FEMALE
    }
}
