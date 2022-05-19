const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const req = require("express/lib/request");

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

router.post("/course/:campus_id",cors(),wardenController.addCourse);

router.put("/course/:course_id",cors(),wardenController.editCourse);

router.delete("/course/:course_id",cors(),wardenController.deleteCourse);


// GET DETAILS

router.get("/wardens",cors(),wardenController.getWardens);

router.get("/mess",cors(),wardenController.getMessDetails);

router.get("/campus",cors(),wardenController.getCampusDetails);



module.exports = router;