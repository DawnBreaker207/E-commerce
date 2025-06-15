package com.dawn.server.model;

import com.dawn.server.constrant.enums.CustomerType;
import com.dawn.server.constrant.enums.Gender;

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
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Customer extends AbstractMappedEntity {
    @Id
    @Column(name = "customer_id", unique = true, nullable = false, updatable = false)
    private String customerId;

    @Column(name = "user_id", nullable = true, updatable = false)
    private String userId;

    @Column(nullable = false)
    private String email;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String phone;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    @Enumerated(EnumType.STRING)
    private CustomerType type;
}
