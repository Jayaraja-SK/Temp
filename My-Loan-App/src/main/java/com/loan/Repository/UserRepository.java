package com.loan.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.loan.Model.User;


public interface UserRepository extends CrudRepository<User, UUID> {
	  public Optional<User> findByEmail(String email);

	  public boolean existsByEmail(String email);
	  
	  public boolean existsById(UUID id);
	}
