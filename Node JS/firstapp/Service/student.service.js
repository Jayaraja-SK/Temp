const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const req = require("express/lib/request");

app.use(express.json());


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Spacex",
    database: "hostel"
});


exports.addLeaveForm = function (data,callback) {
    var request_date = new Date(Date.now()).getFullYear() + "-" + (new Date(Date.now()).getMonth() + 1) + "-" + new Date(Date.now()).getDate();

    var dml = `insert into leave_form_request(student_id, request_date, from_date, to_date, reason, status) values(${data.student_id}, '${request_date}', '${data.from_date}', '${data.to_date}', '${data.reason}', 'NOT_VIEWED')`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}

exports.getStudentDetails = function (email,callback) {
    var dml = `select
    users.email, users.name, users.contact_no, students.gender, campus.campus_name, courses.course_name, students.batch
    from
    users, students, courses, campus
    where
    users.user_id=students.student_id
    and
    users.email='${email}'
    and 
    courses.campus_id=campus.campus_id
    and
    students.campus_id=campus.campus_id
    and
    students.course_id=courses.course_id`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback(result);
    });

}


exports.getLeaveForms = function (student_id,callback) {
    var dml = `select request_id, request_date, from_date, to_date, reason, status from leave_form_request where student_id=${student_id} order by request_date DESC`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback(result);
    });

}

