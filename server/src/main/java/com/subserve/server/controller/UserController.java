package com.subserve.server.controller;

import com.subserve.server.model.User;
import com.subserve.server.payload.LoginPayload;
import com.subserve.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public User getUser(@RequestBody LoginPayload loginPayload){
        User user = userRepository.findByEmail(loginPayload.getEmail());
        if(user != null && user.getPassword().equals(loginPayload.getPassword())){
            return user;
        }
        return null;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
       return userRepository.save(user);
    }

}
