package com.dawn.server.exceptions.wrapper;

import java.io.Serial;

public class CustomerNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public CustomerNotFoundException() {
	super();
    }

    public CustomerNotFoundException(String message, Throwable cause) {
	super(message, cause);
    }

    public CustomerNotFoundException(String message) {
	super(message);
    }

    public CustomerNotFoundException(Throwable cause) {
	super(cause);
    }
}