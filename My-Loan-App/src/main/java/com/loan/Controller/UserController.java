package com.loan.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.loan.Model.Loan;
import com.loan.Model.User;
import com.loan.Request.LoanRequest;
import com.loan.Service.LoanService;
import com.loan.Service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private LoanService loanService;
	

	@RequestMapping(value="/add_loan/{user_id}",method=RequestMethod.POST) 
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Object> addloan(@RequestBody Loan loan, @PathVariable UUID user_id){
		loan.setUser(new User(user_id));
		
		if(userService.verifyUser(user_id))
		{
	  		loanService.addLoan(loan);
	  		
	  		return new ResponseEntity<>(true,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(false,HttpStatus.OK);
		}
	}
	
	
	@RequestMapping(value="/get_my_loans/{user_id}",method=RequestMethod.GET) 
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Loan> getMyLoans(@PathVariable UUID user_id){
		if(userService.verifyUser(user_id))
		{
			return loanService.getMyLoans(user_id);
		}
		else
		{
			return new ArrayList<Loan>();
		}
	}
	

}
