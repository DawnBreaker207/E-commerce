package com.dawn.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dawn.server.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {

}
