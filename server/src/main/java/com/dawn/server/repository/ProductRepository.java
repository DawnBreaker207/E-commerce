package com.dawn.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dawn.server.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
