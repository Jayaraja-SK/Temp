const res = require('express/lib/response');
var studentService = require('../Service/student.service');


exports.addLeaveForm = function (request,response) {
    studentService.addLeaveForm(request.body,  function(result){
        response.send("");

    });

}


exports.getLeaveForms = function (request,response) {
    studentService.getLeaveForms(request.body.student_id,  function(result){
        response.send(result);

    });

}


exports.getStudentDetails = function (request,response) {
    studentService.getStudentDetails(request.body.email_id,  function(result){
        response.send(result);

    });

}


exports.addComplaintReg= function (request,response) {
    studentService.addComplaintReg(request.body,  function(result){
        response.send("");

    });

}
