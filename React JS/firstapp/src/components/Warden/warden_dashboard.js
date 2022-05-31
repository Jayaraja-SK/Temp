import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import '../login.css';



const WardenDashboard = () => {

	const navigate = useNavigate();

	useEffect(() => {
		axios.post("http://localhost:8080/warden/validate", { headers: {'Content-Type': 'application/json','x-auth-header': sessionStorage.getItem("token")}} ).then((res) => {
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
        			<h2>Warden Dashboard</h2>
					<Link to="/"><i id="logout-icon" title="Logout" className="fa fa-sign-out" onClick={() => {sessionStorage.clear();}}></i></Link>

					<ul>
						<li><Link to="/warden_dashboard/add_campus">Add Campus</Link></li>
						<li><Link to="/warden_dashboard/view_campus">View Campus</Link></li>
						<li><Link to="/warden_dashboard/add_course">Add Course</Link></li>
						<li><Link to="/warden_dashboard/user/add_warden">Add Warden</Link></li>
						<li><Link to="/warden_dashboard/user/add_student">Add Student</Link></li>
						<li><Link to="/warden_dashboard/user/add_mess">Add Mess</Link></li>
						<li><Link to="/warden_dashboard/view_wardens">View Wardens</Link></li>
						<li><Link to="/warden_dashboard/view_mess">View Mess</Link></li>
						<li><Link to="/warden_dashboard/view_students">View Students</Link></li>
						<li><Link to="/warden_dashboard/add_warden_student_rel">Add Warden Student Relationship</Link></li>
						<li><Link to="/warden_dashboard/view_warden_student_rel">View Warden Student Relationship</Link></li>
						<li><Link to="/warden_dashboard/add_mess_student_rel">Add Mess Student Relationship</Link></li>
						<li><Link to="/warden_dashboard/view_mess_student_rel">View Mess Student Relationship</Link></li>
						<li><Link to="/warden_dashboard/leave_forms">View All Leave Forms</Link></li>
						<li><Link to="/warden_dashboard/leave_forms_filter">View All Leave Forms By Filter</Link></li>
						<li><Link to="/warden_dashboard/view_complaints">View All Complaints</Link></li>
					</ul>
				</div>

				<Outlet />
			</div>
		</>
		);
};


export default WardenDashboard;