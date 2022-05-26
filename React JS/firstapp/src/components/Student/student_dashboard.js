import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const StudentDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME STUDENT</h1>
			</div>

			<Outlet />
		</>
		);
};


export default StudentDashboard;