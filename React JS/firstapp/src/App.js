import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/login';


import WardenDashboard from "./components/Warden/warden_dashboard";

import {AddCampus, ViewCampus, EditCampus, AddCourse, ViewCourses, EditCourse} from "./components/Warden/campus_courses";
import { AddWarden, AddStudent, AddMess, ViewWardens, EditWarden, EditUser, ViewMess, EditMess, ViewStudents, EditStudent } from './components/Warden/manage_users';
import { AddWardenStudentRel, ViewWardenStudentRel, AddMessStudentRel, ViewMessStudentRel } from "./components/Warden/user_rel"
import { ViewAllLeaveForms, ViewLeaveFormsByFilter } from './components/Warden/leave_form';
import { ViewAllComplaints } from './components/Warden/complaints';


import SubWardenDashboard from "./components/Subwarden/subwarden_dashboard";

import { ViewAllLeaveFormsSubWarden, ViewLeaveFormsByFilterSubWarden } from './components/Subwarden/leave_form';
import { ViewAllComplaintsSubWarden } from './components/Subwarden/complaints';


import StudentDashboard from "./components/Student/student_dashboard";

import { AddLeaveForms, ViewLeaveFormsStudent } from './components/Student/leave_form';
import { AddComplaint, ViewComplaintsStudent } from './components/Student/complaints';
import { AddBillCancellation } from './components/Student/bill_cancellation';


import MessDashboard from "./components/Mess/mess_dashboard";
import { ViewBillCancellationByFilter, ViewStudentBillCancellations, ViewStudentsList } from './components/Mess/bill_cancellation';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />}/>

        <Route path="warden_dashboard" element={<WardenDashboard />}>
          <Route path="add_campus" element={<AddCampus />}/>
          <Route path="view_campus" element={<ViewCampus />}/>
          <Route path="edit_campus" element={<EditCampus />}/>
          <Route path="add_course" element={<AddCourse />}/>
          <Route path="view_courses" element={<ViewCourses />}/>
          <Route path="edit_course" element={<EditCourse />}/>
          <Route path="user/add_warden" element={<AddWarden />}/>
          <Route path="user/add_student" element={<AddStudent />}/>
          <Route path="user/add_mess" element={<AddMess />}/>
          <Route path="view_wardens" element={<ViewWardens />}/>
          <Route path="edit_warden" element={<EditWarden />}/>
          <Route path="view_mess" element={<ViewMess />}/>
          <Route path="edit_mess" element={<EditMess />}/>
          <Route path="view_students" element={<ViewStudents />}/>
          <Route path="edit_student" element={<EditStudent />}/>
          <Route path="edit_user" element={<EditUser />}/>
          <Route path="add_warden_student_rel" element={<AddWardenStudentRel />}/>
          <Route path="view_warden_student_rel" element={<ViewWardenStudentRel />}/>
          <Route path="add_mess_student_rel" element={<AddMessStudentRel />}/>
          <Route path="view_mess_student_rel" element={<ViewMessStudentRel />}/>
          <Route path="leave_forms" element={<ViewAllLeaveForms />}/>
          <Route path="leave_forms_filter" element={<ViewLeaveFormsByFilter />}/>
          <Route path="view_complaints" element={<ViewAllComplaints />}/>
        </Route>


        <Route path="sub_warden_dashboard" element={<SubWardenDashboard />}>
          <Route path="leave_forms" element={<ViewAllLeaveFormsSubWarden />}/>
          <Route path="leave_forms_filter" element={<ViewLeaveFormsByFilterSubWarden />}/>
          <Route path="view_complaints" element={<ViewAllComplaintsSubWarden />}/>
        </Route>
        

        <Route path="/student_dashboard" element={<StudentDashboard />}>
          <Route path="leave_forms" element={<ViewLeaveFormsStudent />}/>
          <Route path="add_leave_form" element={<AddLeaveForms />}/>
          <Route path="add_complaint" element={<AddComplaint />}/>
          <Route path="view_complaints" element={<ViewComplaintsStudent />}/>
          <Route path="bill_cancellation" element={<AddBillCancellation />}/>
        </Route>

        <Route path="/mess_dashboard" element={<MessDashboard />}>
          <Route path="view_bill_cancellations" element={<ViewBillCancellationByFilter />}/>
          <Route path="view_students_list" element={<ViewStudentsList />}/>
          <Route path="student_bill_cancellations" element={<ViewStudentBillCancellations />}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
