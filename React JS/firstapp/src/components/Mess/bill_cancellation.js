import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const ViewBillCancellationByFilter = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	const [filter, setFilter] = useState({
		from_date: null,
        to_date: null
	  });

	const changeHandler = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
	};

    const filterHandler = (e) => {
        e.preventDefault();

		axios.get("http://localhost:8080/mess/bill_cancellations/"+localStorage.getItem("user_id")+"/from_date="+filter.from_date+"&&to_date="+filter.to_date, data).then((res) => {
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["id"]=i+1;
			}

			setData(res.data);
    });
	};


    return(
		<>
		<br/><br/>
			<div className="main">
				<form id="filter" onSubmit={filterHandler}>

					<label>
						FROM DATE
					</label>

					&nbsp;&nbsp;&nbsp;

					<input type="date" id="from_date" name="from_date" onChange={changeHandler}>
					</input>


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
						<th>S.No</th>
                        <th>Student Name</th>
                        <th>Campus Name</th>
                        <th>Course Name</th>
                        <th>Batch</th>
                        <th>Contact No</th>
                        <th>Request Date</th>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.id}>
							<td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.campus_name}</td>
                            <td>{data.course_name}</td>
                            <td>{data.batch}</td>
                            <td>{data.contact_no}</td>
                            <td>{data.request_date}</td>
                            <td>{data.from_date}</td>
                            <td>{data.to_date}</td>

                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);

}


const ViewStudentsList = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	const [campus, setCampus] = useState([]);

	const [courses, setCourses] = useState([]);

	const [filter, setFilter] = useState({
		campus_id: null,
		course_id: null,
		batch: null
	  });

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

	},[]);


	const changeHandler = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
	};


	const getCourses = () => {
		axios.get("http://localhost:8080/warden/campus/"+document.getElementById("campus_id").value+"/courses", data).then((res) => {
			var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["value"]=res.data[i].degree+" "+res.data[i].course_name;

				delete res.data[i]["course_name"];
				delete res.data[i]["degree"];
				delete res.data[i]["no_of_years"];
			}

			setCourses(res.data);
    });
	};

    const filterHandler = (e) => {
		e.preventDefault();

		axios.get("http://localhost:8080/mess/students_list/"+localStorage.getItem("user_id")+"/campus_id="+filter.campus_id+"&&course_id="+filter.course_id+"&&batch="+filter.batch, data).then((res) => {
			document.getElementById("filter").reset();
			setData(res.data);
    });
	}

    const infoHandler = (id,name,contact_no,campus_name,course_name,batch) => {
        localStorage.setItem("mess_student_id",id);
        localStorage.setItem("mess_student_name",name);
        localStorage.setItem("mess_contact_no",contact_no);
        localStorage.setItem("mess_campus_name",campus_name);
        localStorage.setItem("mess_course_name",course_name);
        localStorage.setItem("mess_batch",batch);
        navigate("/mess_dashboard/student_bill_cancellations");
	}


    return(
		<>
		<br/><br/>
			<div className="main">
            <form id="filter" onSubmit={filterHandler}>

                <label>
                    CAMPUS
                </label>

                &nbsp;&nbsp;&nbsp;

                <select name="campus_id" id="campus_id" onChange={e => {changeHandler(e);getCourses();}} required>
                    <option value="">Select Campus</option> 
                    {
                        campus.map((campus,key) => {
                            return <option key={key} value={campus.campus_id}>{campus.value}</option>;
                        })
                    }
                </select>

                &nbsp;&nbsp;&nbsp;


                <label>
                    COURSE
                </label>

                &nbsp;&nbsp;&nbsp;

                <select name="course_id" id="course_id" onChange={changeHandler} required>
                    <option value="">Select Course</option> 
                    {
                        courses.map((courses,key) => {
                            return <option key={key} value={courses.course_id}>{courses.value}</option>;
                        })
                    }
                </select>

                &nbsp;&nbsp;&nbsp;

                <label>
                    BATCH
                </label>

                &nbsp;&nbsp;&nbsp;

                <input type="number" id="batch" name="batch" defaultValue={data.company_loc} onChange={changeHandler}>
                </input>


                <button type="submit">
                        FILTER
                </button>
                </form>


                <table>
				<thead>
                    <tr>
						<th>Id</th>
                        <th>Name</th>
                        <th>Campus Name</th>
						<th>Course Name</th>
						<th>Batch</th>
						<th>Room No</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.student_id}>
							<td>{data.student_id}</td>
							<td>{data.name}</td>
                            <td>{data.campus_name}</td>
							<td>{data.course_name}</td>
							<td>{data.batch}</td>
							<td>{data.room_no}</td>
							<td><button onClick={() => infoHandler(data.student_id, data.name, data.contact_no, data.campus_name, data.course_name, data.batch)}>VIEW CANCELLATIONS</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);

}


const ViewStudentBillCancellations = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        name: localStorage.getItem("mess_student_name"),
        campus_name: localStorage.getItem("mess_campus_name"),
        course_name: localStorage.getItem("mess_course_name"),
        batch: localStorage.getItem("mess_batch"),
        contact_no: localStorage.getItem("mess_contact_no")
    });

	useEffect(() => {
		axios.get("http://localhost:8080/mess/bill_cancellations_student/"+localStorage.getItem("user_id")+"/"+localStorage.getItem("mess_student_id")).then((res) => {
		    var i;

			for(i=0;i<res.data.length;i++)
			{
				res.data[i]["id"]=i+1;
			}

            setData(res.data);
		});

	},[]);



    return(
		<>
		<br/><br/>
			<div className="main">

                <p>
                    NAME - {info.name}
                </p>

                <p>
                    CONTACT NO. - {info.contact_no}
                </p>

                <p>
                    CAMPUS NAME - {info.campus_name}
                </p>

                <p>
                    COURSE NAME - {info.course_name}
                </p>

                <p>
                    BATCH - {info.batch}
                </p>


                <table>
				<thead>
                    <tr>
						<th>Id</th>
                        <th>Request Date</th>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.id}>
							<td>{data.id}</td>
                            <td>{data.request_date}</td>
                            <td>{data.from_date}</td>
                            <td>{data.to_date}</td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);

}


export {ViewBillCancellationByFilter, ViewStudentsList, ViewStudentBillCancellations};