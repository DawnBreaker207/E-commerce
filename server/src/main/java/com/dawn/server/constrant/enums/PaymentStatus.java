package com.dawn.server.constrant.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentStatus {
    @JsonProperty("Pending")
    PENDING,

    @JsonProperty("Paid")
    PAID,

    @JsonProperty("Failed")
    FAILED,

    @JsonProperty("Refunded")
    REFUNDED
}
