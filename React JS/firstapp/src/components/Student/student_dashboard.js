import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import '../login.css';



const StudentDashboard = () => {
	const navigate = useNavigate();

    useEffect(() => {
      axios.post("http://localhost:8080/student/validate", { headers: {'Content-Type': 'application/json','x-auth-header': sessionStorage.getItem("token")}} ).then((res) => {
	 	 if(res.data === 'INVALID TOKEN' || res.data === 'NO TOKEN')
        {
          navigate("/");
          sessionStorage.clear();
        }
        else if(res.data === 'ACCESS DENIED')
        {
          navigate("/");
          sessionStorage.clear();
        }
      });

    },[]);

	return(
		<>
			<div className="wrapper">
				<div className="sidebar">
					<h2>Student Dashboard</h2>
					<Link to="/"><i id="logout-icon" title="Logout" className="fa fa-sign-out" onClick={() => {sessionStorage.clear();}}></i></Link>
					
					<ul>
						<li><Link to="/student_dashboard/leave_forms">View Leave Forms</Link></li>
						<li><Link to="/student_dashboard/add_leave_form">Leave Request Form</Link></li>
						<li><Link to="/student_dashboard/add_complaint">Register Complaints</Link></li>
						<li><Link to="/student_dashboard/view_complaints">View Complaints</Link></li>
						<li><Link to="/student_dashboard/bill_cancellation">Cancel Mess Bills</Link></li>
						<li><Link to="/student_dashboard/change_pwd">Change Password</Link></li>
					</ul>
				</div>
				<Outlet />
			</div>
		</>
		);
};


export default StudentDashboard;