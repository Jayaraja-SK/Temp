import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const AddWardenStudentRel = () => {

    const navigate = useNavigate();

	const [campus, setCampus] = useState([]);

	const [wardens, setWardens] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/campus").then((res) => {
		
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["value"]=res.data[i].campus_name+" "+res.data[i].campus_loc;

				delete res.data[i]["campus_name"];
				delete res.data[i]["campus_loc"];
			}

			setCampus(res.data);
		});


        axios.get("http://localhost:8080/warden/wardens").then((res) => {
		
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["value"]=res.data[i].name+" "+res.data[i].contact_no;
			}

			setWardens(res.data);
		});

	},[]);
	
	const [data, setData] = useState({
		warden_id: null,
        campus_id: null,
        batch: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};


    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/warden_student", data).then((res) => {
			if(res.data === true)
            {
                document.getElementById("add_warden_student_rel").reset();
			    notify("DETAILS ADDED SUCCESSFULLY");
            }
            else
            {
                document.getElementById("add_warden_student_rel").reset();
			    notify("RELATION ALREADY EXISTS");
            }
    });
	};

	return(
		<>
			<div className="main">
				<form id="add_warden_student_rel" onSubmit={submitHandler}>

                <h3>
                    ADD WARDEN STUDENT RELATIONSHIP
                </h3>


                <label>
                    WARDEN
                </label>

                <br/>

                <select name="warden_id" id="warden_id" onChange={changeHandler} required>
                    <option value="">Select Warden</option> 
                    {
                        wardens.map((wardens,key) => {
                            return <option key={key} value={wardens.user_id}>{wardens.value}</option>;
                        })
                    }
                </select>

                <br/>

                <label>
                    CAMPUS
                </label>

                <br/>

                <select name="campus_id" id="campus_id" onChange={changeHandler} required>
                    <option value="">Select Campus</option> 
                    {
                        campus.map((campus,key) => {
                            return <option key={key} value={campus.campus_id}>{campus.value}</option>;
                        })
                    }
                </select>

                <br/>

                <label>
					BATCH
				</label>

				<br/>

				<input type="number" id="batch" name="batch" onChange={changeHandler} defaultValue={data.batch}>
				</input>

				<br/>

				<button type="submit">
						SUBMIT
				</button>

				<br/><br/><br/>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


const ViewWardenStudentRel = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/warden_student_rel").then((res) => {
            var i;

            for(i=0;i<res.data.length;i++)
            {
                res.data[i]["id"]=i;
            }

			setData(res.data);
		});

	},[]);

	const deleteHandler = (warden_id,campus_id,batch) => {
        axios.delete("http://localhost:8080/warden/warden_student/warden_id="+warden_id+"&&campus_id="+campus_id+"&&batch="+batch).then((res) => {
			window.location.reload();
		});
	}


	return(
		<>
		<br/><br/>
			<div className="main">
				<table>
				<thead>
                    <tr>
						<th>WARDEN ID</th>
                        <th>WARDEN NAME</th>
                        <th>CAMPUS ID</th>
                        <th>CAMPUS NAME</th>
                        <th>CAMPUS LOCATION</th>
                        <th>BATCH</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.id}>
							<td>{data.warden_id}</td>
                            <td>{data.name}</td>
                            <td>{data.campus_id}</td>
                            <td>{data.campus_name}</td>
                            <td>{data.campus_loc}</td>
                            <td>{data.batch}</td>
							<td><button onClick={() => deleteHandler(data.warden_id,data.campus_id,data.batch)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const AddMessStudentRel = () => {

    const navigate = useNavigate();

	const [campus, setCampus] = useState([]);

	const [mess, setMess] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/campus").then((res) => {
		
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["value"]=res.data[i].campus_name+" "+res.data[i].campus_loc;

				delete res.data[i]["campus_name"];
				delete res.data[i]["campus_loc"];
			}

			setCampus(res.data);
		});


        axios.get("http://localhost:8080/warden/mess").then((res) => {
		
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["value"]=res.data[i].name+" "+res.data[i].contact_no;
			}

			setMess(res.data);
		});

	},[]);
	
	const [data, setData] = useState({
		mess_id: null,
        campus_id: null,
        batch: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};


    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/mess_student", data).then((res) => {
			if(res.data === true)
            {
                document.getElementById("add_mess_student_rel").reset();
			    notify("DETAILS ADDED SUCCESSFULLY");
            }
            else
            {
                document.getElementById("add_mess_student_rel").reset();
			    notify("RELATION ALREADY EXISTS");
            }
    });
	};

	return(
		<>
			<div className="main">
				<form id="add_mess_student_rel" onSubmit={submitHandler}>

                <h3>
                    ADD MESS STUDENT RELATIONSHIP
                </h3>


                <label>
                    MESS
                </label>

                <br/>

                <select name="mess_id" id="mess_id" onChange={changeHandler} required>
                    <option value="">Select Mess</option> 
                    {
                        mess.map((mess,key) => {
                            return <option key={key} value={mess.user_id}>{mess.value}</option>;
                        })
                    }
                </select>

                <br/>

                <label>
                    CAMPUS
                </label>

                <br/>

                <select name="campus_id" id="campus_id" onChange={changeHandler} required>
                    <option value="">Select Campus</option> 
                    {
                        campus.map((campus,key) => {
                            return <option key={key} value={campus.campus_id}>{campus.value}</option>;
                        })
                    }
                </select>

                <br/>

                <label>
					BATCH
				</label>

				<br/>

				<input type="number" id="batch" name="batch" onChange={changeHandler} defaultValue={data.batch}>
				</input>

				<br/>

				<button type="submit">
						SUBMIT
				</button>

				<br/><br/><br/>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


const ViewMessStudentRel = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/mess_student_rel").then((res) => {
            var i;

            for(i=0;i<res.data.length;i++)
            {
                res.data[i]["id"]=i;
            }

			setData(res.data);
		});

	},[]);

	const deleteHandler = (mess_id,campus_id,batch) => {
        axios.delete("http://localhost:8080/warden/mess_student/mess_id="+mess_id+"&&campus_id="+campus_id+"&&batch="+batch).then((res) => {
			window.location.reload();
		});
	}


	return(
		<>
		<br/><br/>
			<div className="main">
				<table>
				<thead>
                    <tr>
						<th>MESS ID</th>
                        <th>MESS NAME</th>
                        <th>CAMPUS ID</th>
                        <th>CAMPUS NAME</th>
                        <th>CAMPUS LOCATION</th>
                        <th>BATCH</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.id}>
							<td>{data.mess_id}</td>
                            <td>{data.name}</td>
                            <td>{data.campus_id}</td>
                            <td>{data.campus_name}</td>
                            <td>{data.campus_loc}</td>
                            <td>{data.batch}</td>
							<td><button onClick={() => deleteHandler(data.mess_id,data.campus_id,data.batch)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddWardenStudentRel, ViewWardenStudentRel, AddMessStudentRel, ViewMessStudentRel};