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

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/warden/campus").then((res) => {
			setData(res.data)
		});

	},[]);

	const editHandler = (id,name,loc) => {
		console.log(id,name,loc);

	}

	const deleteHandler = (id) => {
		axios.delete("http://localhost:8080/warden/campus/"+id, data).then((res) => {
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
                        <th>Location</th>
                    </tr>
                </thead>

				<tbody>
                    {data && data.map(data =>
                        <tr key={data.campus_id}>
							<td>{data.campus_id}</td>
                            <td>{data.campus_name}</td>
                            <td>{data.campus_loc}</td>
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


const EditCampus = () => {

	


	return(
		<>
		<br/><br/>
			<div className="main">
				

				<ToastContainer/>
			</div>
		</>
		);
};


export {AddCampus, ViewCampus, EditCampus};