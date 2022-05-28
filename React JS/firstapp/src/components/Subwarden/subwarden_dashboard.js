import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const SubWardenDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME WARDEN</h1>
			</div>


			<Link to="/sub_warden_dashboard/leave_forms">
				VIEW ALL FORMS
			</Link>


			<br/><br/>

			<Link to="/sub_warden_dashboard/leave_forms_filter">
				VIEW ALL FORMS BY FILTER
			</Link>

			<br/><br/>

			<Link to="/sub_warden_dashboard/view_complaints">
				VIEW ALL COMPLAINTS
			</Link>

			<Outlet />
		</>
		);
};


export default SubWardenDashboard;