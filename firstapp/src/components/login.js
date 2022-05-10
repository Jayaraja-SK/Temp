import React, { useState } from "react";
import './login.css'
import axios from "axios";

const Login = () => {
	
	const [data, setData] = useState({
		email: "",
		password: "",
	  });
	
	const { email, password } = data;

	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		console.log(e.target.name,e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		console.log(email);
		
		axios.post("http://localhost:8080/login", data).then((res) => {
      
    });
	};

	return(
		<>
			<div class="main">
				<form onSubmit={submitHandler}>
				<h1>
					HOSTEL MANAGEMENT PORTAL
				</h1>

				<h3>
					LOGIN
				</h3>



				<label>
					EMAIL
				</label>

				<br/>

				<input type="email" id="email" name="email" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					PASSWORD
				</label>

				<br/>

				<input type="password" id="password" name="password" onChange={changeHandler}>
				</input>

				<br/><br/>

				<button type="submit">
						LOGIN
				</button>
				</form>
			</div>
		</>
		);
};


export default Login;