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


exports.addAdmin = async function () {

    connection.connect((err) => {
        if(err) throw err;

        var dml = "select email from users where email = 'admin@ssn'";
    
        connection.query(dml,function(err,result,field) {
            if(err) throw err;
            
            if(result.length==0)
            {
                console.log("ADMIN DOES NOT EXIST...\n");
    
                dml = "insert into users(email,name,role,password) values('admin@ssn','ADMIN','ROLE_WARDEN','admin')";
    
                connection.query(dml,function(err,result,field) {
                    if(err) throw err; 
    
                    console.log("ADMIN HAS BEEN ADDED...\n");

                });

                dml = "insert into wardens(warden_id) values(1)";
    
                connection.query(dml,function(err,result,field) {
                    if(err) throw err; 

                });
            }
            
        });

        
    })

}


exports.addUser = function (data,callback) {
    var dml = `select email from users where email = '${data.email}'`

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        if(result.length==0)
        {
            dml=`insert into users(email,name,contact_no,role,password) values('${data.email}','${data.name}','${data.contact_no}','${data.role}','${data.password}')`;

            connection.query(dml,function(err,result) {
                if(err) throw err;
            });

            return callback(true);

        }
        else
        {
            return callback(false);
        }

        
    });

}


exports.editUser = function (data,user_id,callback) {
    var dml = `select email from users where email = '${data.email}'`

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        if(result.length==0)
        {
            dml=`update users
            set email='${data.email}', name='${data.name}', contact_no=${data.contact_no}
            where user_id=${user_id}`;

            connection.query(dml,function(err,result) {
                if(err) throw err;

                
            });

            return callback(true);

        }

        dml = `select email from users where user_id = '${user_id}'`;

        connection.query(dml,function(err,result,field) {
            if(err) throw err;

            if(result[0].email==data.email)
            {
                dml=`update users
                set email='${data.email}', name='${data.name}', contact_no=${data.contact_no}
                where user_id=${user_id}`;

                connection.query(dml,function(err,result) {
                    if(err) throw err;

                    return callback(true);
                });


            }
            else
            {
                return callback(false);
            }

        });
    });

}


exports.editPassword = function (data,user_id,callback) {
    var dml = `update users
    set password='${data.new_password}'
    where user_id=${user_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback(true);
    });

}


exports.addStudent = function (data,callback) {
    var dml = `select user_id from users where email = '${data.email}'`

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        var user_id = result[0].user_id;

        dml = `insert into students(student_id,dob,gender,campus_id,course_id,batch,room_no) values(${user_id},'${data.dob}','${data.gender}',${data.campus_id},${data.course_id},${data.batch},'${data.room_no}')`;


        connection.query(dml,function(err,result) {
            if(err) throw err;

        });
    
    });

}


exports.editStudent = function (data,student_id,callback) {
    var dml = `update students
    set dob='${data.dob}', gender='${data.gender}', campus_id=${data.campus_id}, course_id=${data.course_id}, batch=${data.batch}, room_no='${data.room_no}'
    where student_id=${student_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.addWarden = function (data,callback) {
    var dml = `select user_id from users where email = '${data.email}'`

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        var user_id = result[0].user_id;

        dml=`insert into wardens values(${user_id},'${data.dob}','${data.doj}')`;

        connection.query(dml,function(err,result) {
            if(err) throw err;

        });
    
    });

}


exports.editWarden = function (data,warden_id,callback) {
    var dml = `update wardens
    set dob='${data.dob}', doj='${data.doj}'
    where warden_id=${warden_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.getWardens = function (callback) {
    var dml = `select 
    users.user_id, users.name, users.email, users.contact_no, wardens.dob, wardens.doj
    from users,wardens
    where users.user_id=wardens.warden_id`;

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        return callback(JSON.stringify(result));
    });

}


exports.getMessDetails = function (callback) {
    var dml = `select 
    users.user_id, users.name, users.email, users.contact_no, mess.company_name, mess.company_loc
    from users,mess
    where users.user_id=mess.mess_id`;

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        return callback(JSON.stringify(result));
    });

}



exports.addMess = function (data,callback) {
    var dml = `select user_id from users where email = '${data.email}'`

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        var user_id = result[0].user_id;

        dml=`insert into mess values(${user_id},'${data.company_name}','${data.company_loc}')`;

        connection.query(dml,function(err,result) {
            if(err) throw err;

        });
    
    });

}


exports.editMess = function (data,mess_id,callback) {
    var dml = `update mess
    set company_name='${data.company_name}', company_loc='${data.company_loc}'
    where mess_id=${mess_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.deleteUser = function (user_id,callback) {
    var dml = `delete from users where user_id=${user_id}`;

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        return callback();
    
    });

}



exports.addCampus = function (data,callback) {
    var dml = `insert into campus(campus_name,campus_loc) values('${data.campus_name}','${data.campus_loc}')`

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.editCampus = function (data,campus_id,callback) {
    var dml = `update campus
    set campus_name='${data.campus_name}',campus_loc='${data.campus_loc}'
    where campus_id=${campus_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.deleteCampus = function (campus_id,callback) {
    var dml = `delete from campus where campus_id = ${campus_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.getCampusDetails = function (callback) {
    var dml = `select 
    campus.campus_id,campus.campus_name,campus.campus_loc,courses.course_id,courses.degree,courses.course_name,courses.no_of_years
    from campus,courses
    where
    campus.campus_id=courses.campus_id`;

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        return callback(result);
    });

}



exports.addCourse = function (data,campus_id,callback) {
    var dml = `insert into courses(campus_id,degree,course_name,no_of_years) values(${campus_id},'${data.degree}','${data.course_name}',${data.no_of_years})`

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}


exports.editCourse = function (data,course_id,callback) {
    var dml = `update courses
    set degree='${data.degree}',course_name='${data.course_name}',no_of_years=${data.no_of_years}
    where course_id=${course_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}



exports.deleteCourse = function (course_id,callback) {
    var dml = `delete from courses where course_id = ${course_id}`;

    connection.query(dml,function(err,result) {
        if(err) throw err;

        return callback();
    });

}