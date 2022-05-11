const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const req = require("express/lib/request");


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Spacex",
    database: "hostel"
});

connection.connect((err) => {
    if(err) throw err;
    console.log("CONNECTED TO MYSQL SERVER");
})

app.get("/",function(request,response){
    response.send("Hello World!")
});


app.post("/login",cors(),function(request,response){
    /*var dml = "insert into login values (?)";

    connection.query(dml,[[request.body.email,request.body.password]]);

    response.send(request.body);*/

    var dml = "select email,password from login where email = \'" + request.body.email+ "\'";

    connection.query(dml,function(err,result,field) {
        if(err) throw err;
        
        if(result.length==0)
        {
            response.send("INVALID USERNAME");
        }
        else if(result[0].password!=request.body.password)
        {
            response.send("INVALID PASSWORD");
        }
        else
        {
            response.send("SUCCESS");
        }
    });
});


app.listen(8080, function () {
    console.log("APPLICATION STARTED ON PORT %d",8080)
});