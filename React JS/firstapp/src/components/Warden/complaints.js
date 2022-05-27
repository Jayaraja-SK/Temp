import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const ViewAllComplaints = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

    const [filter, setFilter] = useState({
        complaint_type: null,
		status: null,
		from_date: null,
		to_date: null
	  });


    const changeHandler = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
	};


    const filterHandler = (e) => {
		e.preventDefault();

		axios.get("http://localhost:8080/warden/complaints/"+localStorage.getItem("user_id")+"/complaint_type="+filter.complaint_type+"&&status="+filter.status+"&&from_date="+filter.from_date+"&&to_date="+filter.to_date).then((res) => {
            setData(res.data);
		});
	}


	return(
		<>
		<br/><br/>
			<div className="main">
            <form id="filter" onSubmit={filterHandler}>

                <label>
                    COMPLAINT TYPE
                </label>

                &nbsp;&nbsp;&nbsp;

                <select name="complaint_type" id="complaint_type" onChange={changeHandler} required>
                    <option >Select Complaint Type</option> 
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="PLUMBING">PLUMBING</option>
                    <option value="FURNITURE">FURNITURE</option>
                    <option value="WIFI">WIFI</option>
                </select>

                &nbsp;&nbsp;&nbsp;

                <label>
                    STATUS
                </label>

                &nbsp;&nbsp;&nbsp;

                <select name="status" id="status" onChange={changeHandler} required>
                    <option >Select Status</option> 
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="NOT_RESOLVED">NOT RESOLVED</option>
                </select>

                &nbsp;&nbsp;&nbsp;


                <label>
                    FROM DATE
                </label>

                &nbsp;&nbsp;&nbsp;

                <input type="date" id="from_date" name="from_date" onChange={changeHandler}>
                </input>

                &nbsp;&nbsp;&nbsp;

                <label>
                    TO DATE
                </label>

                &nbsp;&nbsp;&nbsp;

                <input type="date" id="to_date" name="to_date" onChange={changeHandler}>
                </input>


                <button type="submit">
                        FILTER
                </button>
                </form>

				<table>
				<thead>
                    <tr>
						<th>COMPLAINT ID</th>
                        <th>Student Name</th>
                        <th>Campus Name</th>
                        <th>Course Name</th>
                        <th>Batch</th>
                        <th>Contact No</th>
                        <th>Complaint Date</th>
                        <th>Complaint Type</th>
                        <th>Complaint</th>
                        <th>Status</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.complaint_id}>
                            <td>{data.complaint_id}</td>
							<td>{data.name}</td>
							<td>{data.campus_name}</td>
                            <td>{data.course_name}</td>
                            <td>{data.batch}</td>
							<td>{data.contact_no}</td>
							<td>{data.complaint_date}</td>
                            <td>{data.complaint_type}</td>
                            <td>{data.complaint}</td>
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


export {ViewAllComplaints};