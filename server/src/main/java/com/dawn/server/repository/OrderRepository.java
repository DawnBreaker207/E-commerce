package com.dawn.server.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dawn.server.constrant.enums.OrderStatus;
import com.dawn.server.constrant.enums.PaymentMethod;
import com.dawn.server.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>, JpaSpecificationExecutor<Order> {
    @Query("SELECT o FROM Order o " + "WHERE (:status IS NULL OR o.status = :status) "
	    + "AND (:paymentMethod IS NULL OR o.paymentMethod = :paymentMethod) "
	    + "AND (:startDate IS NULL OR o.createdAt >= :startDate)"
	    + "AND (:endDate IS NULL OR o.createdAt >= :endDate) " + "ORDER BY o.createdAt DESC")
    List<Order> findOrdersWithFilters(@Param("status") OrderStatus status,
	    @Param("paymentMethod") PaymentMethod paymentMethod, @Param("startDate") Instant startDate,
	    @Param("endDate") Instant endDate);

}
