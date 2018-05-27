var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.password,
  database: "spitfireDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("success!"+"connected as id " + connection.threadId + "\n");
//   createProduct();
});