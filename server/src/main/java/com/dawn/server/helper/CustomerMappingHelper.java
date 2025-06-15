package com.dawn.server.helper;

import com.dawn.server.dto.CustomerDto;
import com.dawn.server.model.Customer;

public interface CustomerMappingHelper {
    static CustomerDto map(final Customer customer) {
	return CustomerDto.builder()
			.customerId(customer.getCustomerId())
			.email(customer.getEmail())
			.firstName(customer.getFirstname())
			.lastName(customer.getLastname())
			.phone(customer.getPhone())
			.gender(customer.getGender())
			.type(customer.getType())
			.build();
    }
    
    
    static Customer map(final CustomerDto customerDto) {
	return Customer.builder()
			.customerId(customerDto.getCustomerId())
			.email(customerDto.getEmail())
			.firstname(customerDto.getFirstName())
			.lastname(customerDto.getLastName())
			.phone(customerDto.getPhone())
			.gender(customerDto.getGender())
			.type(customerDto.getType())
			.build();
    }
}
