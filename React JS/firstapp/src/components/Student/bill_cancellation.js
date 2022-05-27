import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';



const AddBillCancellation = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
        student_id: localStorage.getItem("user_id"),
		from_date: null,
        to_date: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/student//bill_cancellation", data).then((res) => {
			document.getElementById("bill_cancellation").reset();
			notify("REQUEST SENT SUCCESSFULLY");
    });
	};

	return(
		<>
			<div className="main">
				<form id="bill_cancellation" onSubmit={submitHandler}>

                <h3>
                    MESS BILL CANCELLATION
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
				

				<button type="submit">
					SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddBillCancellation};