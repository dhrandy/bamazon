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
  //  connection.end()
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("######  ")                                          
    console.log("#     #   ##   #    #   ##   ######  ####  #    #")
    console.log("#     #  #  #  ##  ##  #  #      #  #    # ##   #") 
    console.log("######  #    # # ## # #    #    #   #    # # #  #") 
    console.log("#     # ###### #    # ######   #    #    # #  # #") 
    console.log("#     # #    # #    # #    #  #     #    # #   ##") 
    console.log("######  #    # #    # #    # ######  ####  #    #")
    console.log("")
    console.log("--------------------------------------------------6")
    console.log("")
    console.log("ID | " + "Item | " + "Department | " + "Price | " + "Quantity")
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
    }
  });
}

function purchase() {
  // query the database for all items being products
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to purchase
    // console.log(results)
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].product_name);
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
      // console.log(stock_quantity)
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.choice) {
            chosenItem = res[i]
            // console.log(chosenItem)
            // console.log(chosenItem.stock_quantity)
            // console.log(answer.quantity)
          }
        }

        // determine if stock quantity is higher than entered quantity
        // console.log(chosenItem.stock_quantity)
        //     console.log(answer.quantity)
        if (parseInt(answer.quantity) < parseInt(chosenItem.stock_quantity)) {
          var newQuantity = (parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity))
          console.log(newQuantity)
          console.log(chosenItem.item_id)
          console.log(chosenItem.product_name)
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: parseInt(chosenItem.item_id)
              }
            ],
            function(err) {
              if (err) throw err
              console.log("Purchase placed successfully!")
              connection.end()
            }
          )
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Inventory too low...");
          
        }
      });
  });
}