package com.loan.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loan.Model.Loan;
import com.loan.Model.User;
import com.loan.Repository.LoanRepository;
import com.loan.Repository.UserRepository;
import com.loan.Request.LoanRequest;

@Service
@Transactional
public class LoanService {

	@Autowired
	private LoanRepository loanRepo;
	
	public void addLoan(Loan loan) { 
		loan.setStatus("PENDING");
		
		loanRepo.save(loan);
	}
	
	public List<Loan> getMyLoans(UUID id) { 
		List<Loan> result = new ArrayList<Loan>();
		
		loanRepo.findAll().forEach(result::add);
		
		List<Loan> filter = new ArrayList<Loan>();
		
		int i;
		
		for(i=0;i<result.size();i++)
		{
			if(result.get(i).getUser().getId().equals(id))
			{
				filter.add(result.get(i));
			}
		}
		
		return filter;
	}
	
	
	public List<Loan> getAllLoans() { 
		List<Loan> result = new ArrayList<Loan>();
		
		loanRepo.findAll().forEach(result::add);
		
		return result;
	}

}