package com.dawn.server.service;

import com.dawn.server.model.User;

public interface UserService {
    User getLoggedUser();
    void syncUser(User user);
}
