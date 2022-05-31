import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import '../login.css';



const MessDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
      axios.post("http://localhost:8080/mess/validate", { headers: {'Content-Type': 'application/json','x-auth-header': sessionStorage.getItem("token")}} ).then((res) => {
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
            <h2>Mess Dashboard</h2>
            <Link to="/"><i id="logout-icon" title="Logout" className="fa fa-sign-out" onClick={() => {sessionStorage.clear();}}></i></Link>

            <ul>
              <li>
                <Link to="/mess_dashboard/view_bill_cancellations">
                  View Bill Cancellation by Filter
                </Link>
              </li>
              <li>
                <Link to="/mess_dashboard/view_students_list">
                  View Students List
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </>
    );
};

export default MessDashboard;
