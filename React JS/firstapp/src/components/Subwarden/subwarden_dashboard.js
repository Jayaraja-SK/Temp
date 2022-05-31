import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import '../login.css';


const SubWardenDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
      axios.post("http://localhost:8080/sub_warden/validate", { headers: {'Content-Type': 'application/json','x-auth-header': sessionStorage.getItem("token")}} ).then((res) => {
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
    
    return (
      <>
        <div className="wrapper">
          <div className="sidebar">
            <h2>Warden Dashboard</h2>
            <Link to="/"><i id="logout-icon" title="Logout" className="fa fa-sign-out" onClick={() => {sessionStorage.clear();}}></i></Link>

            <ul>
              <li>
                <Link to="/sub_warden_dashboard/leave_forms">View All Leave Forms</Link>
              </li>
              <li>
                <Link to="/sub_warden_dashboard/leave_forms_filter">
                  View All Leave Forms By Filter
                </Link>
              </li>
              <li>
                <Link to="/sub_warden_dashboard/view_complaints">
                  View All Complaints
                </Link>
              </li>
              <li><Link to="/sub_warden_dashboard/change_pwd">Change Password</Link></li>
            </ul>
          </div>
          <Outlet />
        </div>
      </>
    );
};

export default SubWardenDashboard;
