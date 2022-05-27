const res = require('express/lib/response');
var messService = require('../Service/mess.service');


exports.getBillCancellations = function (request,response) {
    messService.getBillCancellations(request.params.mess_id, request.params.from_date, request.params.to_date, function(result){
        response.send(result);

    });

}


exports.getBillCancellationsOfStudent = function (request,response) {
    messService.getBillCancellationsOfStudent(request.params.mess_id, request.params.student_id, function(result){
        response.send(result);

    });

}


exports.getStudentsList = function (request,response) {
    messService.getStudentsList(request.params.mess_id, request.params.campus_id, request.params.course_id, request.params.batch, function(result){
        response.send(result);

    });

}