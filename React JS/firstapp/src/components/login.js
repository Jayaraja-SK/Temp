import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import './login.css';




const Login = () => {
	const navigate = useNavigate();
	
	const [data, setData] = useState({
		email: "",
		password: "",
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/login", data).then((res) => {
			if(res.data.bool === false)
			{
				if(res.data.message === "INVALID EMAIL")
				{
					document.getElementById("email").value="";
					document.getElementById("password").value="";
					notify("INVALID EMAIL");
				}
				else
				{
					document.getElementById("password").value="";
					notify("INVALID PASSWORD");
				}
			}
			else
			{
				localStorage.setItem("email",data.email);
				localStorage.setItem("user_id",res.data.user_id);
				localStorage.setItem("token",res.data.token);

				if(res.data.role === "WARDEN")
				{
					navigate("/warden_dashboard");
				}
				else if(res.data.role === "SUBWARDEN")
				{
					navigate("/sub_warden_dashboard");
				}
				else if(res.data.role === "STUDENT")
				{
					navigate("/student_dashboard");
				}
				else if(res.data.role === "MESS")
				{
					navigate("/mess_dashboard");
				}
			}
    });
	};

	return(
		<>
			<div className="main">
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

				<ToastContainer/>
			</div>
		</>
		);
};


export default Login;