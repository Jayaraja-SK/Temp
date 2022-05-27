import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';



const AddComplaint = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
        student_id: localStorage.getItem("user_id"),
		complaint_type: null,
        complaint: null
	  });

    const complaint_type = [{id: 1, name: "ELECTRICAL"}, {id: 2, name: "FURNITURE"}, {id: 3, name: "PLUMBING"}, {id: 4, name: "WIFI"}];

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/student/complaint_reg", data).then((res) => {
			document.getElementById("complaint_reg").reset();
			notify("COMPLAINT REGISTERED SUCCESSFULLY");
    });
	};

	return(
		<>
			<div className="main">
				<form id="complaint_reg" onSubmit={submitHandler}>

                <h3>
                    COMPLAINT REGISTRATION
				</h3>



				<label>
					COMPLAINT TYPE
				</label>

				<br/>

				<select name="complaint_type" id="complaint_type" onChange={changeHandler} required>
					<option value="">Select Complaint Type</option> 
					{
						complaint_type.map((complaint_type,key) => {
							return <option key={key} value={complaint_type.name}>{complaint_type.name}</option>;
						})
					}
				</select>

				<br/>


                <label>
					COMPLAINT
				</label>

				<br/>

				<input type="text" id="complaint" name="complaint" onChange={changeHandler}>
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


const ViewComplaintsStudent = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/student/complaints/"+localStorage.getItem("user_id")).then((res) => {
			setData(res.data);
		});

	},[]);

    var new_status;


    const changeStatus = (id) => {
        axios.put("http://localhost:8080/student/complaint/complaint_id="+id+"&&status="+new_status, data).then((res) => {
			window.location.reload();
    });
    }


    const changeHandler1 = (e) => {
        new_status = e.target.value;
	};


	return(
		<>
		<br/><br/>
			<div className="main">
				<table>
				<thead>
                    <tr>
						<th>Complaint ID</th>
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
							<td>{data.complaint_date}</td>
							<td>{data.complaint_type}</td>
                            <td>{data.complaint}</td>
                            <td>{data.status}</td>
                            <td>
                                <select name="status" id="status" onChange={e => {changeHandler1(e);changeStatus(data.complaint_id);}}>
                                    <option>Change Status</option> 
                                    <option value="RESOLVED">RESOLVED</option>
                                    <option value="NOT_RESOLVED">NOT RESOLVED</option>
                                </select>
                            </td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddComplaint, ViewComplaintsStudent};