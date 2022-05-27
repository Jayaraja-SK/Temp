import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const StudentDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME STUDENT</h1>
			</div>

			<Link to="/student_dashboard/leave_forms">
				VIEW LEAVE FORMS
			</Link>

			<br/><br/>

			<Link to="/student_dashboard/add_leave_form">
				LEAVE REQUEST FORM
			</Link>

			<br/><br/>

			<Link to="/student_dashboard/add_complaint">
				REGISTER A COMPLAINT
			</Link>

			<br/><br/>


			<Link to="/student_dashboard/view_complaints">
				VIEW COMPLAINTS
			</Link>

			<br/><br/>


			<Link to="/student_dashboard/bill_cancellation">
				CANCEL MESS BILL
			</Link>

			<br/><br/>

			<Outlet />
		</>
		);
};


export default StudentDashboard;