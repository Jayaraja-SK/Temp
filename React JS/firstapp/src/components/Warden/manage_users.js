import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';




const AddStudent = () => {

    const navigate = useNavigate();

	const [campus, setCampus] = useState([]);

	const [courses, setCourses] = useState([]);

	const gender = [{id: 1, value: "M"}, {id: 2, value: "F"}];

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
		email: "",
        name: "",
        contact_no: null,
        role: "STUDENT",
		password: "",
        dob: null,
        gender: "",
        batch: null,
        campus_id: null,
        course_id: null,
		room_no: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
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

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/user/student", data).then((res) => {
			if(res.data === true)
			{
				document.getElementById("add_student").reset();
				notify("DETAILS ADDED SUCCESSFULLY");
			}
			else
			{
				document.getElementById("email").value="";
				notify("EMAIL ID ALREADY EXISTS");
			}
    });
	};

	return(
		<>
			<div className="main">
				<form id="add_student" onSubmit={submitHandler}>

				<h3>
					ADD STUDENT
				</h3>
				
				<label>
					EMAIL
				</label>

				<br/>

				<input type="email" id="email" name="email" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					NAME
				</label>

				<br/>

				<input type="text" id="name" name="name" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CONTACT NO
				</label>

				<br/>

				<input type="number" id="contact_no" name="contact_no" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					PASSWORD
				</label>

				<br/>
				

				<input type="password" id="password" name="password" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					DOB
				</label>

				<br/>
				

				<input type="date" id="dob" name="dob" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					GENDER
				</label>

				<br/>
				

				<select name="gender" id="gender" onChange={changeHandler} required>
					<option value="">Select Gender</option> 
					{
						gender.map((gender,key) => {
							return <option key={key} value={gender.value}>{gender.value}</option>;
						})
					}
				</select>

				<br/>


				<label>
					CAMPUS
				</label>

				<br/>

				<select name="campus_id" id="campus_id" onChange={e => {changeHandler(e);getCourses();}} required>
					<option value="">Select Campus</option> 
					{
						campus.map((campus,key) => {
							return <option key={key} value={campus.campus_id}>{campus.value}</option>;
						})
					}
				</select>

				<br/>


				<label>
					COURSE
				</label>

				<br/>

				<select name="course_id" id="course_id" onChange={changeHandler} required>
					<option value="">Select Course</option> 
					{
						courses.map((courses,key) => {
							return <option key={key} value={courses.course_id}>{courses.value}</option>;
						})
					}
				</select>

				<br/>

				<label>
					BATCH
				</label>

				<br/>
				

				<input type="number" id="batch" name="batch" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					ROOM NO
				</label>

				<br/>
				

				<input type="text" id="room_no" name="room_no" onChange={changeHandler}>
				</input>

				<br/><br/>



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


const AddWarden = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
		email: "",
        name: "",
        contact_no: null,
        role: "WARDEN",
		password: "",
		dob: null,
		doj: null
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/user/warden", data).then((res) => {
			if(res.data === true)
			{
				document.getElementById("add_warden").reset();
				notify("DETAILS ADDED SUCCESSFULLY");
			}
			else
			{
				document.getElementById("email").value="";
				notify("EMAIL ID ALREADY EXISTS");
			}
    });

	};

	return(
		<>
			<div className="main">
				<form id="add_warden" onSubmit={submitHandler}>

				<h3>
					ADD WARDEN
				</h3>



				<label>
					EMAIL
				</label>

				<br/>

				<input type="email" id="email" name="email" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					NAME
				</label>

				<br/>

				<input type="text" id="name" name="name" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CONTACT NO
				</label>

				<br/>

				<input type="number" id="contact_no" name="contact_no" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					PASSWORD
				</label>

				<br/>

				<input type="password" id="password" name="password" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					DOB
				</label>

				<br/>

				<input type="date" id="dob" name="dob" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					DOJ
				</label>

				<br/>

				<input type="date" id="doj" name="doj" onChange={changeHandler}>
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


const AddMess = () => {

    const navigate = useNavigate();
	
	const [data, setData] = useState({
		email: "",
        name: "",
        contact_no: null,
        role: "MESS",
		password: "",
		company_name: "",
		company_loc: ""
	  });

    const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.post("http://localhost:8080/warden/user/mess", data).then((res) => {
			if(res.data === true)
			{
				document.getElementById("add_mess").reset();
				notify("DETAILS ADDED SUCCESSFULLY");
			}
			else
			{
				document.getElementById("email").value="";
				notify("EMAIL ID ALREADY EXISTS");
			}
    });
		
	};

	return(
		<>
			<div className="main">
				<form id="add_mess" onSubmit={submitHandler}>

				<h3>
					ADD MESS
				</h3>

				<label>
					EMAIL
				</label>

				<br/>

				<input type="email" id="email" name="email" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					NAME
				</label>

				<br/>

				<input type="text" id="name" name="name" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CONTACT NO
				</label>

				<br/>

				<input type="number" id="contact_no" name="contact_no" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					PASSWORD
				</label>

				<br/>

				<input type="password" id="password" name="password" onChange={changeHandler}>
				</input>

				<br/>

				<label>
					COMPANY NAME
				</label>

				<br/>

				<input type="text" id="company_name" name="company_name" onChange={changeHandler}>
				</input>

				<br/>


				<label>
					COMPANY LOCATION
				</label>

				<br/>

				<input type="text" id="company_loc" name="company_loc" onChange={changeHandler}>
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


const ViewWardens = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/wardens").then((res) => {
			setData(res.data)
		});

	},[]);

	const editHandler1 = (id,name,email,contact) => {
		localStorage.setItem("edit_user_id",id);
		localStorage.setItem("edit_name",name);
		localStorage.setItem("edit_email",email);
		localStorage.setItem("edit_contact_no",contact);

		navigate("/warden_dashboard/edit_user");

	}

	const editHandler2 = (id,name,email,dob,doj) => {
		localStorage.setItem("warden_user_id",id);
		localStorage.setItem("warden_name",name);
		localStorage.setItem("warden_email",email);
		localStorage.setItem("warden_dob",dob);
		localStorage.setItem("warden_doj",doj);

		navigate("/warden_dashboard/edit_warden");

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/user/"+id, data).then((res) => {
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
						<th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
						<th>Contact No.</th>
						<th>DOB</th>
						<th>DOJ</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.user_id}>
							<td>{data.user_id}</td>
							<td>{data.name}</td>
                            <td>{data.email}</td>
							<td>{data.contact_no}</td>
							<td>{data.dob}</td>
							<td>{data.doj}</td>
							<td><button onClick={() => editHandler1(data.user_id, data.name, data.email, data.contact_no)}>EDIT ACCOUNT INFO</button></td>
							<td><button onClick={() => editHandler2(data.user_id, data.name, data.email, data.dob, data.doj)}>EDIT PERSONAL INFO</button></td>
							<td><button onClick={() => deleteHandler(data.user_id)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const EditUser = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		user_id: localStorage.getItem("edit_user_id"),
		name: localStorage.getItem("edit_name"),
		email: localStorage.getItem("edit_email"),
		contact_no: localStorage.getItem("edit_contact_no")
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/user/"+data.user_id, data).then((res) => {
			localStorage.removeItem("edit_user_id");
			localStorage.removeItem("edit_name");
			localStorage.removeItem("edit_email");
			localStorage.removeItem("edit_contact_no");

			if(res.data === true)
			{
				document.getElementById("edit_user").reset();
				notify("DATA EDITED SUCCESSFULLY");
				//navigate("/warden_dashboard/view_wardens");
			}
			else
			{
				document.getElementById("email").value="";
				notify("EMAIL ALREADY EXISTS");
			}

    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form id="edit_user" onSubmit={submitHandler}>
				<h3>
					EDIT ACCOUNT DETAILS
				</h3>


				<label>
					USER ID
				</label>

				<br/>

				<input type="text" id="user_id" name="user_id" defaultValue={data.user_id} disabled={true}>
				</input>

				<br/>

				<label>
					EMAIL
				</label>

				<br/>

				<input type="email" id="email" name="email" defaultValue={data.email} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					NAME
				</label>

				<br/>

				<input type="text" id="name" name="name" defaultValue={data.name} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CONTACT NO.
				</label>

				<br/>

				<input type="number" id="contact_no" name="contact_no" defaultValue={data.contact_no} onChange={changeHandler}>
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


const EditWarden = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		user_id: localStorage.getItem("warden_user_id"),
		name: localStorage.getItem("warden_name"),
		email: localStorage.getItem("warden_email"),
		warden_dob: localStorage.getItem("warden_dob"),
		warden_doj: localStorage.getItem("warden_doj")
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/user/warden/"+data.user_id, data).then((res) => {
			localStorage.removeItem("warden_user_id");
			localStorage.removeItem("warden_name");
			localStorage.removeItem("warden_email");
			localStorage.removeItem("warden_dob");
			localStorage.removeItem("warden_doj");

			notify("DATA EDITED SUCCESSFULLY");

			navigate("/warden_dashboard/view_wardens");
    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form onSubmit={submitHandler}>
				<h3>
					EDIT WARDEN DETAILS
				</h3>


				<p>WARDEN NAME - {data.name}</p>

				<p>WARDEN EMAIL - {data.email}</p>

				<label>
					WARDEN ID
				</label>

				<br/>

				<input type="text" id="user_id" name="user_id" defaultValue={data.user_id} disabled={true}>
				</input>

				<br/>

				<label>
					DOB
				</label>

				<br/>

				<input type="date" id="dob" name="dob" defaultValue={data.warden_dob} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					DOJ
				</label>

				<br/>

				<input type="date" id="doj" name="doj" defaultValue={data.warden_doj} onChange={changeHandler}>
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


const ViewMess = () => {

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/mess").then((res) => {
			setData(res.data)
		});

	},[]);

	const editHandler1 = (id,name,email,contact) => {
		localStorage.setItem("edit_user_id",id);
		localStorage.setItem("edit_name",name);
		localStorage.setItem("edit_email",email);
		localStorage.setItem("edit_contact_no",contact);

		navigate("/warden_dashboard/edit_user");

	}

	const editHandler2 = (id,name,email,company_name,company_loc) => {
		localStorage.setItem("mess_user_id",id);
		localStorage.setItem("mess_name",name);
		localStorage.setItem("mess_email",email);
		localStorage.setItem("mess_company_name",company_name);
		localStorage.setItem("mess_company_loc",company_loc);

		navigate("/warden_dashboard/edit_mess");

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/user/"+id, data).then((res) => {
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
						<th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
						<th>Contact No.</th>
						<th>COMPANY NAME</th>
						<th>COMPANY LOCATION</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.user_id}>
							<td>{data.user_id}</td>
							<td>{data.name}</td>
                            <td>{data.email}</td>
							<td>{data.contact_no}</td>
							<td>{data.company_name}</td>
							<td>{data.company_loc}</td>
							<td><button onClick={() => editHandler1(data.user_id, data.name, data.email, data.contact_no)}>EDIT ACCOUNT INFO</button></td>
							<td><button onClick={() => editHandler2(data.user_id, data.name, data.email, data.company_name, data.company_loc)}>EDIT PERSONAL INFO</button></td>
							<td><button onClick={() => deleteHandler(data.user_id)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const EditMess = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		user_id: localStorage.getItem("mess_user_id"),
		name: localStorage.getItem("mess_name"),
		email: localStorage.getItem("mess_email"),
		company_name: localStorage.getItem("mess_company_name"),
		company_loc: localStorage.getItem("mess_company_loc")
	  });
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/user/mess/"+data.user_id, data).then((res) => {
			localStorage.removeItem("mess_user_id");
			localStorage.removeItem("mess_name");
			localStorage.removeItem("mess_email");
			localStorage.removeItem("mess_company_name");
			localStorage.removeItem("mess_company_loc");

			notify("DATA EDITED SUCCESSFULLY");

			navigate("/warden_dashboard/view_mess");
    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form onSubmit={submitHandler}>
				<h3>
					EDIT MESS DETAILS
				</h3>


				<p>MESS NAME - {data.name}</p>

				<p>MESS EMAIL - {data.email}</p>

				<label>
					MESS ID
				</label>

				<br/>

				<input type="text" id="user_id" name="user_id" defaultValue={data.user_id} disabled={true}>
				</input>

				<br/>

				<label>
					COMPANY NAME
				</label>

				<br/>

				<input type="text" id="company_name" name="company_name" defaultValue={data.company_name} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					COMPANY LOCATION
				</label>

				<br/>

				<input type="text" id="company_loc" name="company_loc" defaultValue={data.company_loc} onChange={changeHandler}>
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


const ViewStudents = () => {

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

	const editHandler1 = (id,name,email,contact) => {
		localStorage.setItem("edit_user_id",id);
		localStorage.setItem("edit_name",name);
		localStorage.setItem("edit_email",email);
		localStorage.setItem("edit_contact_no",contact);

		navigate("/warden_dashboard/edit_user");

	}

	const editHandler2 = (id,name,email,dob,gender,room_no,campus_id,course_id,batch) => {
		localStorage.setItem("student_user_id",id);
		localStorage.setItem("student_name",name);
		localStorage.setItem("student_email",email);
		localStorage.setItem("student_dob",dob);
		localStorage.setItem("student_gender",gender);
		localStorage.setItem("student_room_no",room_no);
		localStorage.setItem("student_campus_id",campus_id);
		localStorage.setItem("student_course_id",course_id);
		localStorage.setItem("student_batch",batch);

		var i;

		for(i=0;i<campus.length;i++)
		{
			if(campus_id === campus[i].campus_id)
			{
				localStorage.setItem("student_campus_info",campus[i].value);
				break;
			}
		}

		for(i=0;i<courses.length;i++)
		{
			if(campus_id === campus[i].campus_id)
			{
				localStorage.setItem("student_course_info",courses[i].value);
				break;
			}
		}

		navigate("/warden_dashboard/edit_student");

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/user/"+id, data).then((res) => {
			window.location.reload();
		});
	}

	const filterHandler = (e) => {
		e.preventDefault();

		axios.get("http://localhost:8080/warden/students/campus_id="+filter.campus_id+"&&course_id="+filter.course_id+"&&batch="+filter.batch, data).then((res) => {
			document.getElementById("filter").reset();
			setData(res.data);
    });
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
                        <th>Email</th>
						<th>Contact No.</th>
						<th>DOB</th>
						<th>Gender</th>
						<th>Room No</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.user_id}>
							<td>{data.user_id}</td>
							<td>{data.name}</td>
                            <td>{data.email}</td>
							<td>{data.contact_no}</td>
							<td>{data.dob}</td>
							<td>{data.gender}</td>
							<td>{data.room_no}</td>
							<td><button onClick={() => editHandler1(data.user_id, data.name, data.email, data.contact_no)}>EDIT ACCOUNT INFO</button></td>
							<td><button onClick={() => editHandler2(data.user_id, data.name, data.email, data.dob, data.gender, data.room_no, data.campus_id, data.course_id, data.batch)}>EDIT PERSONAL INFO</button></td>
							<td><button onClick={() => deleteHandler(data.user_id)}>DELETE</button></td>
                        </tr>
                    )}
                </tbody>
				</table>

				<ToastContainer/>
			</div>
		</>
		);
};


const EditStudent = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		user_id: localStorage.getItem("student_user_id"),
		name: localStorage.getItem("student_name"),
		email: localStorage.getItem("student_email"),
		dob: localStorage.getItem("student_dob"),
		gender: localStorage.getItem("student_gender"),
		room_no: localStorage.getItem("student_room_no"),
		campus_id: localStorage.getItem("student_campus_id"),
		campus_info: localStorage.getItem("student_campus_info"),
		course_id: localStorage.getItem("student_course_id"),
		course_info: localStorage.getItem("student_course_info"),
		batch: localStorage.getItem("student_batch")
	  });

	
	  const [campus, setCampus] = useState([]);

	  const [courses, setCourses] = useState([]);

	  const gender = [{id: 1, value: "M"}, {id: 2, value: "F"}];

  
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
  
  
  
	  const getCourses = () => {
		  document.getElementById("default_course").value="";

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
	
	const changeHandler = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const notify = (e) => toast(e);

	const submitHandler = (e) => {
		e.preventDefault();

		axios.put("http://localhost:8080/warden/user/student/"+data.user_id, data).then((res) => {
			localStorage.removeItem("student_user_id");
			localStorage.removeItem("student_name");
			localStorage.removeItem("student_email");
			localStorage.removeItem("student_dob");
			localStorage.removeItem("student_gender");
			localStorage.removeItem("student_room_no");
			localStorage.removeItem("student_campus_id");
			localStorage.removeItem("student_campus_info");
			localStorage.removeItem("student_course_id");
			localStorage.removeItem("student_course_info");
			localStorage.removeItem("student_batch");

			notify("DATA EDITED SUCCESSFULLY");

			navigate("/warden_dashboard");
    });
	}

	return(
		<>
		<br/><br/>
			<div className="main">
				
				<form onSubmit={submitHandler}>
				<h3>
					EDIT STUDENT DETAILS
				</h3>


				<p>STUDENT NAME - {data.name}</p>

				<p>STUDENT EMAIL - {data.email}</p>

				<label>
					STUDENT ID
				</label>

				<br/>

				<input type="text" id="user_id" name="user_id" defaultValue={data.user_id} disabled={true}>
				</input>

				<br/>

				<label>
					DOB
				</label>

				<br/>

				<input type="date" id="dob" name="dob" defaultValue={data.dob} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					GENDER
				</label>

				<br/>

				<select name="gender" id="gender" onChange={changeHandler} required>
					<option value={data.gender}>Change Gender</option> 
					{
						gender.map((gender,key) => {
							return <option key={key} value={gender.value}>{gender.value}</option>;
						})
					}
				</select>

				<br/>

				<label>
					ROOM NO.
				</label>

				<br/>

				<input type="text" id="room_no" name="room_no" defaultValue={data.room_no} onChange={changeHandler}>
				</input>

				<br/>

				<label>
					CAMPUS
				</label>

				<br/>

				<select name="campus_id" id="campus_id" onChange={e => {changeHandler(e);getCourses();}} required>
					<option value={data.campus_info}>Change Campus</option> 
					{
						campus.map((campus,key) => {
							return <option key={key} value={campus.campus_id}>{campus.value}</option>;
						})
					}
				</select>

				<br/>


				<label>
					COURSE
				</label>

				<br/>

				<select name="course_id" id="course_id" onChange={changeHandler} required>
					<option value={data.course_info} id="default_course">Change Course</option> 
					{
						courses.map((courses,key) => {
							return <option key={key} value={courses.course_id}>{courses.value}</option>;
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
				</form>

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddStudent, AddWarden, AddMess, ViewWardens, EditWarden, EditUser, ViewMess, EditMess, ViewStudents, EditStudent};