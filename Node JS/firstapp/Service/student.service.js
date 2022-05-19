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