const res = require('express/lib/response');
var userService = require('../Service/user.service');

exports.addAdmin = async function () {
    userService.addAdmin();
}

exports.addUser = function (request,response,next) {
    userService.addUser(request.body, function(result){
        response.send(result);
    });

}