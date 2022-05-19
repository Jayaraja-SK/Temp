const res = require('express/lib/response');
var wardenService = require('../Service/warden.service');

exports.addAdmin = async function () {
    wardenService.addAdmin();
}

exports.addStudent = function (request,response) {
    wardenService.addUser(request.body, function(result){
        response.send(result);

        if(result == true)
        {
            wardenService.addStudent(request.body, function(result) {

            })
        }
    });

}


exports.editStudent = function (request,response) {
    wardenService.editStudent(request.body, request.params.student_id,  function(result){
        response.send("");

    });

}


exports.addWarden = function (request,response) {
    wardenService.addUser(request.body, function(result){
        response.send(result);

        if(result == true)
        {
            wardenService.addWarden(request.body, function(result) {

            })
        }
    });

}


exports.editWarden = function (request,response) {
    wardenService.editWarden(request.body, request.params.warden_id,  function(result){
        response.send("");

    });

}


exports.getWardens = function (request,response) {
    wardenService.getWardens(function(result){
        response.send(result);

    });

}


exports.getMessDetails = function (request,response) {
    wardenService.getMessDetails(function(result){
        response.send(result);

    });

}


exports.addMess = function (request,response) {
    wardenService.addUser(request.body, function(result){
        response.send(result);

        if(result == true)
        {
            wardenService.addMess(request.body, function(result) {

            })
        }
    });

}


exports.editMess = function (request,response) {
    wardenService.editMess(request.body, request.params.mess_id,  function(result){
        response.send("");

    });

}


exports.editUser = function (request,response) {
    wardenService.editUser(request.body, request.params.user_id, function(result){
        response.send(result);
    });

}


exports.editPassword = function (request,response) {
    wardenService.editPassword(request.body, request.params.user_id, function(result){
        response.send(result);
    });

}



exports.deleteUser = function (request,response) {
    wardenService.deleteUser(request.params.user_id, function(result){
        response.send("");
    });

}



exports.addCampus = function (request,response) {
    wardenService.addCampus(request.body, function(result){
        response.send("");

    });

}


exports.editCampus = function (request,response) {
    wardenService.editCampus(request.body, request.params.campus_id,  function(result){
        response.send("");

    });

}



exports.deleteCampus = function (request,response) {
    wardenService.deleteCampus(request.params.campus_id, function(result){
        response.send(result);
    });

}



exports.addCourse = function (request,response) {
    wardenService.addCourse(request.body, request.params.campus_id,  function(result){
        response.send("");

    });

}


exports.editCourse = function (request,response) {
    wardenService.editCourse(request.body, request.params.course_id,  function(result){
        response.send("");

    });

}



exports.deleteCourse = function (request,response) {
    wardenService.deleteCourse(request.params.course_id, function(result){
        response.send(result);
    });

}


exports.getCampusDetails = function (request,response) {
    wardenService.getCampusDetails(function(result){
        var filteredResult = {};

        var i;

        for(i=0;i<result.length;i++)
        {
            if(!(result[i].campus_id in filteredResult))
            {
                filteredResult[result[i].campus_id] = {"campus_name":result[i].campus_name,"campus_loc":result[i].campus_loc,"courses":[]};
            }

            filteredResult[result[i].campus_id]["courses"].push({"course_id":result[i].course_id,"degree":result[i].degree,"course_name":result[i].course_name,"no_of_years":result[i].no_of_years});            

        }

        response.send(filteredResult);

    });

}


/*exports.getCourses = function (request,response) {
    wardenService.getCourses(request.params.campus_id, function(result){
        response.send(result);

    });

}*/