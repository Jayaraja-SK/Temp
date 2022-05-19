const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const req = require("express/lib/request");

var router = express.Router();

var messController = require("../Controller/mess.controller");


module.exports = router;