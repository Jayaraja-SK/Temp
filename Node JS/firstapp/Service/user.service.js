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
    
                dml = "insert into users values('admin@ssn','ADMIN','ROLE_WARDEN','admin')";
    
                connection.query(dml,function(err,result,field) {
                    if(err) throw err; 
    
                    console.log("ADMIN HAS BEEN ADDED...\n");

                });

            }

            
        });

        
    })

}


exports.addUser = function (data) {
    console.log(data);
    console.log(data.email);

    let val;

    connection.connect((err) => {
        console.log("CONNECTED");
        
    });

    var dml = "select email from users where email = \'"+data.email+"\'";

    connection.query(dml,function(err,result,field) {
        if(err) throw err;

        console.log(result);
        
        if(result.length==0)
        {
            return "NOT EXISTS";

        }
        else
        {
            return "EXISTS";
        }

        
    });
}