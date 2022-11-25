const express = require("express");
const app = express();
const cors = require('cors');


require('dotenv').config();

const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    });


var corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static("./public"))

app.listen(8080, function () {
    console.log("APPLICATION STARTED ON PORT %d\n",8080)

    const connectDb = async () => {
        await pool.connect()

        await pool.query(`create table if not exists temp(no varchar(20));`)

        await pool.query(`insert into temp values('Hello')`)

        const res = await pool.query('SELECT * FROM temp')
        console.log(res.rows)
    }

    connectDb()

});

