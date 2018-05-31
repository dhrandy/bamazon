require("dotenv").config()
var inquirer = require("inquirer")

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "spitfireDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
   queryAllProducts()
  purchase()
   connection.end()
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("ID | " + "Item | " + "Department | " + "Price | " + "Quantity")
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
    }
  });
}

function purchase() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    console.log(results)
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What is the ID of the product you'd like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        // if (chosenItem.highest_bid < parseInt(answer.bid)) {
        //   // bid was high enough, so update db, let the user know, and start over
        //   connection.query(
        //     "UPDATE auctions SET ? WHERE ?",
        //     [
        //       {
        //         highest_bid: answer.bid
        //       },
        //       {
        //         id: chosenItem.id
        //       }
        //     ],
        //     function(error) {
        //       if (error) throw err;
        //       console.log("Bid placed successfully!");
        //       start();
        //     }
        //   );
        // }
        // else {
        //   // bid wasn't high enough, so apologize and start over
        //   console.log("Your bid was too low. Try again...");
        //   start();
        // }
      });
  });
}



