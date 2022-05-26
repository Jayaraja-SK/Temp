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

			<Outlet />
		</>
		);
};


export default WardenDashboard;