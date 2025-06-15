package com.dawn.server.constrant.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum OrderStatus {
    @JsonProperty("Pending")
    PENDING,

    @JsonProperty("Confirmed")
    CONFIRMED,

    @JsonProperty("Shipping")
    SHIPPING,

    @JsonProperty("Delivered")
    DELIVERED,

    @JsonProperty("Cancelled")
    CANCELLED,

    @JsonProperty("Returned")
    RETURNED
}
