package com.loan.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.loan.Service.UserService;
import com.loan.Model.User;
import com.loan.Repository.UserRepository;

@RestController
public class AuthController {

	@Autowired
	private UserService userService;


  @RequestMapping(value="/signup",method=RequestMethod.POST) // USE TO STORE A NEW USER IN THE DATABASE
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Object> saveUser(@RequestBody User user){
	  	if(userService.saveUser(user))
		{
	      return new ResponseEntity<>(true,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(false,HttpStatus.OK);
		}
	}

}