const res = require('express/lib/response');
var studentService = require('../Service/student.service');


exports.addLeaveForm = function (request,response) {
    studentService.addLeaveForm(request.body,  function(result){
        response.send("");

    });

}