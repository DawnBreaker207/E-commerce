package com.dawn.server.exceptions.wrapper;

import java.io.Serial;

public class UserNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public UserNotFoundException() {
	super();
    }

    public UserNotFoundException(String message, Throwable cause) {
	super(message, cause);
    }

    public UserNotFoundException(String message) {
	super(message);
    }

    public UserNotFoundException(Throwable cause) {
	super(cause);
    }

}
