const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const req = require("express/lib/request");
const auth=require('../middleware/auth');

var router = express.Router();

var wardenController = require("../Controller/warden.controller");


router.post("/user/student",cors(),wardenController.addStudent);

router.post("/user/warden",cors(),wardenController.addWarden);

router.post("/user/mess",cors(),wardenController.addMess);


// EDIT USER

router.put("/user/:user_id",cors(),wardenController.editUser);

router.put("/user/pwd/:user_id",cors(),wardenController.editPassword);

router.put("/user/student/:student_id",cors(),wardenController.editStudent);

router.put("/user/warden/:warden_id",cors(),wardenController.editWarden);

router.put("/user/mess/:mess_id",cors(),wardenController.editMess);


// DELETE USER

router.delete("/user/:user_id",cors(),wardenController.deleteUser);



// ADD, EDIT, DELETE CAMPUS


router.post("/campus",cors(),wardenController.addCampus);

router.put("/campus/:campus_id",cors(),wardenController.editCampus);

router.delete("/campus/:campus_id",cors(),wardenController.deleteCampus);



// ADD, EDIT, DELETE COURSES

router.post("/campus/:campus_id/course",cors(),wardenController.addCourse);

router.put("/campus/:campus_id/course/:course_id",cors(),wardenController.editCourse);

router.delete("/campus/:campus_id/course/:course_id",cors(),wardenController.deleteCourse);


// WARDEN STUDENTS RELATIONSHIP

router.post("/warden_student",cors(),wardenController.addWardenStudentRel);

router.delete("/warden_student/campus_id=:campus_id&&batch=:batch",cors(),wardenController.deleteWardenStudentRel);


// GET DETAILS

router.get("/wardens",cors(),wardenController.getWardens);

router.get("/mess",cors(),wardenController.getMessDetails);

router.get("/students/campus_id=:campus_id&&course_id=:course_id&&batch=:batch",cors(),wardenController.getStudents);

router.delete("/students/campus_id=:campus_id&&course_id=:course_id&&batch=:batch",cors(),wardenController.deleteStudents);

router.delete("/students/campus_id=:campus_id&&batch=:batch",cors(),wardenController.deleteStudentsByCampusBatch);

router.get("/batches/campus_id=:campus_id&&course_id=:course_id",cors(),wardenController.getBatches);

router.get("/students/email=:email",cors(),wardenController.getStudentInfoByEmail);

router.get("/campus",cors(),wardenController.getAllCampus);

router.get("/campus/:campus_id/courses",cors(),wardenController.getCoursesByCampus);

router.get("/leave_forms",cors(),wardenController.getLeaveForms);

router.get("/leave_forms/status:status&&from_date:from_date&&to_date:to_date",cors(),wardenController.getLeaveFormsByDateStatus);

router.get("/leave_forms/student_:student_id",cors(),wardenController.getLeaveFormsByStudentId);

router.put("/leave_forms/request_id=:request_id&&status=:status",cors(),wardenController.changeLeaveFormStatus);



module.exports = router;