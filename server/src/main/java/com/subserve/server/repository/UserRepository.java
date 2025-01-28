package com.subserve.server.repository;

import com.subserve.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByPassword(String password);

    User findByEmail(String email);

    User findByPassword(String password);
}
