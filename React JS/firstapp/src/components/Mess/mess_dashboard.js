import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const MessDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME MESS</h1>
			</div>

			<Link to="/mess_dashboard/view_bill_cancellations">
				VIEW BILL CANCELLATIONS BY FILTER
			</Link>

			<br/><br/>


			<Link to="/mess_dashboard/view_students_list">
				VIEW STUDENTS LIST
			</Link>

			<br/><br/>


			<Outlet />
		</>
		);
};


export default MessDashboard;