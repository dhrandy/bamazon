////////////////////////////////////////////////////
// required files
////////////////////////////////////////////////////
require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
////////////////////////////////////////////////////
// Creates a connection to the mysql database
////////////////////////////////////////////////////
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

// The rest of the code will go here.
