package com.dawn.server.constrant.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum PaymentMethod {
    @JsonProperty("COD")
    COD,

    @JsonProperty("VNPAY")
    VNPAY,

    @JsonProperty("MOMO")
    MOMO,

    @JsonProperty("ZALOPAY")
    ZALOPAY
}
