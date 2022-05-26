import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/login';

import WardenDashboard from "./components/Warden/warden_dashboard";

import {AddCampus, ViewCampus} from "./components/Warden/campus_courses";


import StudentDashboard from "./components/Student/student_dashboard";


import MessDashboard from "./components/Mess/mess_dashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />}/>

        <Route path="warden_dashboard" element={<WardenDashboard />}>
          <Route path="add_campus" element={<AddCampus />}/>
          <Route path="view_campus" element={<ViewCampus />}/>
        </Route>
        

        <Route path="/student_dashboard" element={<StudentDashboard />}>

        </Route>

        <Route path="/mess_dashboard" element={<MessDashboard />}>

        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
