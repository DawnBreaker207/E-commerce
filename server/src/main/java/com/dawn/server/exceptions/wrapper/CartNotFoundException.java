package com.dawn.server.exceptions.wrapper;

import java.io.Serial;

public class CartNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public CartNotFoundException() {
	super();
    }

    public CartNotFoundException(String message, Throwable cause) {
	super(message, cause);
    }

    public CartNotFoundException(String message) {
	super(message);
    }

    public CartNotFoundException(Throwable cause) {
	super(cause);
    }
}
