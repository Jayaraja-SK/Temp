import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const AddCampus = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
		campus_name: "",
        campus_loc: ""
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/campus", data).then((res) => {
			document.getElementById("add_campus").reset();
			notify("DETAILS ADDED SUCCESSFULLY");
    });
	};

	return(
		<>
			<div className="main">
				<form id="add_campus" onSubmit={submitHandler}>

                <h3>
					ADD CAMPUS DETAILS
				</h3>



				<label>
					NAME
				</label>

				<br/>

				<input type="text" id="campus_name" name="campus_name" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					LOCATION
				</label>

				<br/>

				<input type="text" id="campus_loc" name="campus_loc" onChange={changeHandler}>
				</input>

				<br/><br/>    
				

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};



const ViewCampus = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/campus").then((res) => {
			setData(res.data)
		});

	},[]);

	const editHandler = (id,name,loc) => {
		localStorage.setItem("campus_id",id);
		localStorage.setItem("campus_name",name);
		localStorage.setItem("campus_loc",loc);

		navigate("/warden_dashboard/edit_campus");

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/campus/"+id, data).then((res) => {
			window.location.reload();
		});
	}

	const viewCourses = (id,name,loc) => {
		localStorage.setItem("campus_id",id);
		localStorage.setItem("campus_name",name);
		localStorage.setItem("campus_loc",loc);

		navigate("/warden_dashboard/view_courses");
	}


	return(
		<>
		<br/><br/>
			<div className="main">
				<table>
				<thead>
                    <tr>
						<th>Id</th>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.campus_id}>
							<td>{data.campus_id}</td>
                            <td>{data.campus_name}</td>
                            <td>{data.campus_loc}</td>
							<td><button onClick={() => viewCourses(data.campus_id, data.campus_name, data.campus_loc)}>VIEW COURSES</button></td>
							<td><button onClick={() => editHandler(data.campus_id, data.campus_name, data.campus_loc)}>EDIT</button></td>
							<td><button onClick={() => deleteHandler(data.campus_id)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const ViewCourses = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	var campus_name = localStorage.getItem("campus_name"), campus_loc;

	useEffect(() => {
		campus_name = localStorage.getItem("campus_name");
		campus_loc = localStorage.getItem("campus_loc");

		axios.get("http://localhost:8080/warden/campus/"+localStorage.getItem("campus_id")+"/courses").then((res) => {
			setData(res.data)
		});

	},[]);

	const editHandler = (id,degree,name,years) => {
		localStorage.setItem("course_id",id);
		localStorage.setItem("degree",degree);
		localStorage.setItem("course_name",name);
		localStorage.setItem("no_of_years",years);

		navigate("/warden_dashboard/edit_course");

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/campus/"+localStorage.getItem("campus_id")+"/course/"+id).then((res) => {
			window.location.reload();
		});
	}


	campus_name = localStorage.getItem("campus_name");
	campus_loc = localStorage.getItem("campus_loc");


	return(
		<>
		<br/><br/>
			<div className="main">
				<p>CAMPUS NAME - {campus_name}</p>
				<p>CAMPUS LOCATION - {campus_loc}</p>

				<table>
				<thead>
                    <tr>
						<th>Id</th>
                        <th>Degree</th>
                        <th>Course Name</th>
						<th>Years</th>
                    </tr>
                </thead>

				<tbody>
					{data && data.map(data =>
                        <tr key={data.course_id}>
							<td>{data.course_id}</td>
							<td>{data.degree}</td>
                            <td>{data.course_name}</td>
                            <td>{data.no_of_years}</td>
							<td><button onClick={() => editHandler(data.course_id, data.degree, data.course_name, data.no_of_years)}>EDIT</button></td>
							<td><button onClick={() => deleteHandler(data.campus_id)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const EditCourse = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		campus_id: localStorage.getItem("campus_id"),
		course_id: localStorage.getItem("course_id"),
		course_name: localStorage.getItem("course_name"),
		degree: localStorage.getItem("degree"),
		no_of_years: localStorage.getItem("no_of_years")
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/campus/"+data.campus_id+"/course/"+data.course_id, data).then((res) => {
			localStorage.removeItem("course_id");
			localStorage.removeItem("course_name");
			localStorage.removeItem("degree");
			localStorage.removeItem("no_of_years");

			notify("DATA EDITED SUCCESSFULLY");

			navigate("/warden_dashboard/view_courses");
    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form onSubmit={submitHandler}>
				<h3>
					EDIT CAMPUS DETAILS
				</h3>



				<label>
					COURSE ID
				</label>

				<br/>

				<input type="text" id="course_id" name="course_id" defaultValue={data.course_id} disabled={true}>
				</input>

				<br/>

				<label>
					DEGREE
				</label>

				<br/>

				<input type="text" id="degree" name="degree" defaultValue={data.degree} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					COURSE NAME
				</label>

				<br/>

				<input type="text" id="course_name" name="course_name" defaultValue={data.course_name} onChange={changeHandler}>
				</input>

				<br/>

				<input type="number" id="no_of_years" name="no_of_years" defaultValue={data.no_of_years} onChange={changeHandler}>
				</input>

				<br/><br/>

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


const EditCampus = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		campus_id: localStorage.getItem("campus_id"),
		campus_name: localStorage.getItem("campus_name"),
		campus_loc: localStorage.getItem("campus_loc")
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/campus/"+data.campus_id, data).then((res) => {
			localStorage.removeItem("campus_id");
			localStorage.removeItem("campus_name");
			localStorage.removeItem("campus_loc");

			notify("DATA EDITED SUCCESSFULLY");

			navigate("/warden_dashboard/view_campus");
    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form onSubmit={submitHandler}>
				<h3>
					EDIT CAMPUS DETAILS
				</h3>



				<label>
					CAMPUS ID
				</label>

				<br/>

				<input type="text" id="campus_id" name="campus_id" defaultValue={data.campus_id} disabled={true}>
				</input>

				<br/>

				<label>
					CAMPUS NAME
				</label>

				<br/>

				<input type="text" id="campus_name" name="campus_name" defaultValue={data.campus_name} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CAMPUS LOCATION
				</label>

				<br/>

				<input type="text" id="campus_loc" name="campus_loc" defaultValue={data.campus_loc} onChange={changeHandler}>
				</input>

				<br/><br/>

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


const AddCourse = () => {

    const navigate = useNavigate();

	const [campus, setCampus] = useState([]);

	const degree = [{id: 1, name: "BE"}, {id: 2, name: "B.Tech"}];

	const course = [{id: 1, name: "CSE"}, {id: 2, name: "IT"}, {id: 3, name: "ECE"}, {id: 4, name: "EEE"}, {id: 5, name: "Mech"}, {id: 7, name: "Civil"}, {id: 8, name: "BME"}, {id: 9, name: "Chemical"}];

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
	
	const [data, setData] = useState({
		campus_id: null,
		degree: "",
		course_name: "",
		no_of_years: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/campus/"+data.campus_id+"/course", data).then((res) => {
			document.getElementById("add_course").reset();
			notify("DETAILS ADDED SUCCESSFULLY");
    });
	};

	return(
		<>
			<div className="main">
				<form id="add_course" onSubmit={submitHandler}>

                <h3>
					ADD COURSE DETAILS
				</h3>

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

				<br/><br/>

				<label>
					DEGREE
				</label>

				<br/>

				<select name="degree" id="degree" onChange={changeHandler}>
					<option>Select Degree</option> 
					{
						degree.map((degree,key) => {
							return <option key={key} value={degree.name}>{degree.name}</option>;
						})
					}
				</select>

				<br/><br/>

				<label>
					COURSE NAME
				</label>

				<br/>

				<select name="course_name" id="course_name" onChange={changeHandler}>
					<option>Select Course</option> 
					{
						course.map((course,key) => {
							return <option key={key} value={course.name}>{course.name}</option>;
						})
					}
				</select>

				<br/><br/>

				<label>
					NO OF YEARS
				</label>

				<br/>

				<input type="number" id="no_of_years" name="no_of_years" onChange={changeHandler}>
				</input>

				<br/><br/>
				

				<button type="submit">
						SUBMIT
				</button>
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddCampus, ViewCampus, EditCampus, AddCourse, ViewCourses, EditCourse};