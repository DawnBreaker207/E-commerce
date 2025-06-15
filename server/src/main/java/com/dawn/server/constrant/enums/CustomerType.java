package com.dawn.server.constrant.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CustomerType {
    @JsonProperty("Register")
    REGISTERD,

    @JsonProperty("Guest")
    GUEST
}
