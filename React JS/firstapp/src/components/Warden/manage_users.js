import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const addStudent = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
		email: "",
        name: "",
        contact_no: null,
        role: "STUDENT",
		password: "",
        dob: null,
        gender: "",
        batch: null,
        campus_id: null,
        course_id: null,
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		
	};

	return(
		<>
			<div className="main">
				<form onSubmit={submitHandler}>
				

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


export default addStudent;