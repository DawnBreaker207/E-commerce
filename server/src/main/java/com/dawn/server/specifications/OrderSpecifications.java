package com.dawn.server.specifications;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.dawn.server.constrant.enums.OrderStatus;
import com.dawn.server.constrant.enums.PaymentStatus;
import com.dawn.server.model.Order;

public class OrderSpecifications {
    public static Specification<Order> hasStatus(OrderStatus status) {
	return (root, query, cb) -> status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Order> hasPaymentStatus(PaymentStatus status) {
	return (root, query, cb) -> status == null ? null : cb.equal(root.get("paymentStatus"), status);
    }

    public static Specification<Order> hasCreatedAtBetween(LocalDate from, LocalDate to) {
	return (root, query, cb) -> {
	    if (from == null && to == null)
		return null;
	    if (from != null && to != null)
		return cb.between(root.get("createdAt"), from.atStartOfDay(), to.plusDays(1).atStartOfDay());
	    if (from != null)
		return cb.greaterThanOrEqualTo(root.get("createdAt"), from.atStartOfDay());

	    return cb.lessThan(root.get("createdAt"), to.plusDays(1).atStartOfDay());
	};
    }
    
    public static Specification<Order> hasQuery(String queryText) {
	return (root, query, cb) -> {
	    if (queryText == null || queryText.trim().isEmpty())
		return null;
	    String like = "%" + queryText.toLowerCase() + "%";
	    return cb.or(cb.like(cb.lower(cb.toString(root.get("orderId"))), like),
		    cb.like(cb.lower(root.get("customer").get("email")), like)

	    );
	};
    }
}
