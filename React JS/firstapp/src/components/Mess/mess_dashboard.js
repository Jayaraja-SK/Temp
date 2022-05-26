import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Router, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const MessDashboard = () => {

	return(
		<>
			<div>
				<h1>WELCOME MESS</h1>
			</div>

			<Outlet />
		</>
		);
};


export default MessDashboard;