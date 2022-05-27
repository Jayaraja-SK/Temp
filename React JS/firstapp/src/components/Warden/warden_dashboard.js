import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const WardenDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME WARDEN</h1>
			</div>

			<Link to="/warden_dashboard/add_campus">
				ADD CAMPUS
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/view_campus">
				VIEW CAMPUS
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/add_course">
				ADD COURSE
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/user/add_warden">
				ADD WARDEN
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/user/add_student">
				ADD STUDENT
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/user/add_mess">
				ADD MESS
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/view_wardens">
				VIEW WARDENS
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/view_mess">
				VIEW MESS
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/view_students">
				VIEW STUDENTS
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/add_warden_student_rel">
				ADD WARDEN STUDENT RELATIONSHIP
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/view_warden_student_rel">
				VIEW WARDEN STUDENT RELATIONSHIP
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/add_mess_student_rel">
				ADD MESS STUDENT RELATIONSHIP
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/view_mess_student_rel">
				VIEW MESS STUDENT RELATIONSHIP
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/leave_forms">
				VIEW ALL FORMS
			</Link>


			<br/><br/>

			<Link to="/warden_dashboard/leave_forms_filter">
				VIEW ALL FORMS BY FILTER
			</Link>

			<br/><br/>

			<Link to="/warden_dashboard/view_complaints">
				VIEW ALL COMPLAINTS
			</Link>

			<Outlet />
		</>
		);
};


export default WardenDashboard;