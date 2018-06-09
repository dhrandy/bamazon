////////////////////////////////////////////////////
// required files
////////////////////////////////////////////////////
require("dotenv").config()
var inquirer = require("inquirer")
var mysql = require("mysql")
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
    start()
    queryAllProducts()
    purchase()
        //  connection.end()
});
////////////////////////////////////////////////////
// Function that runs and displays initial information
////////////////////////////////////////////////////
function start() {
    console.log("######  ");
    console.log("#     #   ##   #    #   ##   ######  ####  #    #");
    console.log("#     #  #  #  ##  ##  #  #      #  #    # ##   #");
    console.log("######  #    # # ## # #    #    #   #    # # #  #");
    console.log("#     # ###### #    # ######   #    #    # #  # #");
    console.log("#     # #    # #    # #    #  #     #    # #   ##");
    console.log("######  #    # #    # #    # ######  ####  #    #");
    console.log("");
    console.log("Welcome to Bamazom! Enjoy your shopping!")
    console.log("");
}
////////////////////////////////////////////////////
// function which displays all the products
////////////////////////////////////////////////////
function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
            head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            style: {
                head: ['yellow'],
                compact: true,
                colAligns: ['center'],
            },
            chars: {
                'top': '═',
                'top-mid': '╤',
                'top-left': '╔',
                'top-right': '╗',
                'bottom': '═',
                'bottom-mid': '╧',
                'bottom-left': '╚',
                'bottom-right': '╝',
                'left': '║',
                'left-mid': '╟',
                'mid': '─',
                'mid-mid': '┼',
                'right': '║',
                'right-mid': '╢',
                'middle': '│'
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
            );
        }

        //this console.logs the table
        console.log(table.toString());
        console.log("");
    })
}
////////////////////////////////////////////////////
// function which allows you to select what you want to purchase
////////////////////////////////////////////////////
function purchase() {
    // query the database for all items being products
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to purchase
        // console.log(results)
        inquirer
            .prompt([{
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
                }, {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }

            ])
            .then(function(answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        chosenItem = res[i]
                    }
                }

                // determine if stock quantity is higher than entered quantity
                if (parseInt(answer.quantity) < parseInt(chosenItem.stock_quantity)) {
                    var newQuantity = (parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity))

                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newQuantity
                        }, {
                            item_id: parseInt(chosenItem.item_id)
                        }],
                        function(err) {
                            if (err) throw err
                            console.log("");
                            console.log("--------------------------------------------------");
                            console.log("");
                            console.log("Purchase placed successfully!");
                            console.log("Total Cost: $" + (parseInt(answer.quantity) * parseFloat(chosenItem.price)));
                            console.log("");
                            console.log("--------------------------------------------------");
                            console.log("");
                            anotherPurchase();
                            // wait(2000);
                        }
                    )
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Inventory too low..." + " Make a new selection.");
                    // wait(2000);
                    queryAllProducts();
                    purchase();
                }
            });
    });
}
////////////////////////////////////////////////////
// function which runs after you make a purchase which ask if you'd like to continue shopping or exit.
////////////////////////////////////////////////////
function anotherPurchase() {
    inquirer
        .prompt({
            name: "manager",
            type: "rawlist",
            message: "MAKE A SELECTION",
            choices: ["CONTINUE WITH ANOTHER PURCHASE", "EXIT"]
        })

    .then(function(answer) {
        // based on their answer, either call the correct function
        if (answer.manager === "CONTINUE WITH ANOTHER PURCHASE") {
            queryAllProducts();
            purchase();
        } else if (answer.manager === "EXIT") {
            console.log("Thanks for shopping with Bamazon. Have a great day!");
            process.exit();
        } else {
            console.log("INVALID SELECTION, TRY AGAIN.")
            start();
            queryAllProducts();
            purchase();
        }
    })
}
////////////////////////////////////////////////////
// function which runs a timer - added exit function, so I no longer use this
////////////////////////////////////////////////////
// function wait(ms) {
//     var start = new Date().getTime();
//     var end = start;
//     while (end < start + ms) {
//         end = new Date().getTime();
//     }
// }