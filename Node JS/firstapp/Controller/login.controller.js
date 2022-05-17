const res = require('express/lib/response');
var userService = require('../Service/user.service');

exports.addAdmin = async function () {
    userService.addAdmin();
}

exports.addUser = function (data) {
    var val = userService.addUser(data);

    console.log(val);

    return val;
}