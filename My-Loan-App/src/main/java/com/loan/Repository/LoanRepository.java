package com.loan.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.loan.Model.Loan;
import com.loan.Model.User;

public interface LoanRepository extends CrudRepository<Loan, UUID> {

	@Query(value = "SELECT * FROM loan WHERE user_id = ?1", nativeQuery = true)
	public List<Loan> findLoansByUser(UUID user_id);
	
}
