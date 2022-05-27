import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const ViewLeaveFormsStudent = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/student/leave_forms/"+localStorage.getItem("user_id")).then((res) => {
			setData(res.data);
		});

	},[]);


	return(
		<>
		<br/><br/>
			<div className="main">
				<table>
				<thead>
                    <tr>
						<th>Request ID</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.request_id}>
                            <td>{data.request_id}</td>
							<td>{data.from_date}</td>
							<td>{data.to_date}</td>
                            <td>{data.reason}</td>
                            <td>{data.status}</td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const AddLeaveForms = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
        student_id: localStorage.getItem("user_id"),
		from_date: null,
        to_date: null,
        reason: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/student/leave_form", data).then((res) => {
			document.getElementById("leave_form").reset();
			notify("REQUEST SENT SUCCESSFULLY");
    });
	};

	return(
		<>
			<div className="main">
				<form id="leave_form" onSubmit={submitHandler}>

                <h3>
                    LEAVE REQUEST FORM
				</h3>



				<label>
					FROM DATE
				</label>

				<br/>

				<input type="date" id="from_date" name="from_date" onChange={changeHandler}>
				</input>

				<br/>


                <label>
					TO DATE
				</label>

				<br/>

				<input type="date" id="to_date" name="to_date" onChange={changeHandler}>
				</input>

				<br/>

                <label>
					REASON
				</label>

				<br/>

				<input type="text" id="reason" name="reason" onChange={changeHandler}>
				</input>

				<br/>
				

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


export {ViewLeaveFormsStudent, AddLeaveForms};