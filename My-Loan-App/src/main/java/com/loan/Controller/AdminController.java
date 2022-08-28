package com.loan.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.loan.Model.Loan;
import com.loan.Model.User;
import com.loan.Service.LoanService;
import com.loan.Service.UserService;

@RestController
public class AdminController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private LoanService loanService;


	@RequestMapping(value="/users",method=RequestMethod.GET) 
	@CrossOrigin(origins = "http://localhost:3000")
	public List<User> getUsers(){
	  	return userService.getUsers();
	}
	
	
	@RequestMapping(value="/get_all_loans",method=RequestMethod.GET) 
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Loan> getAllLoans(){
		return loanService.getAllLoans();
	}
}
