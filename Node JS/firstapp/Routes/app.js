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


var loginController = require("../Controller/login.controller");

loginController.addAdmin();

connection.connect((err) => {
    if(err) throw err;
    console.log("CONNECTED TO MYSQL SERVER\n");

})

app.get("/",function(request,response){
    response.send("Hello World!")
});


app.post("/warden/add_user",cors(),function(request,response){
    var a = loginController.addUser(request.body);
    console.log(a);
    response.send(a);
});


app.post("/login",cors(),function(request,response){
    /*var dml = "insert into login values (?)";

    connection.query(dml,[[request.body.email,request.body.password]]);

    response.send(request.body);*/

    console.log(request.body);

    var dml = "select email,password from users where email = \'" + request.body.email+ "\'";

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
    console.log("APPLICATION STARTED ON PORT %d\n",8080)
});