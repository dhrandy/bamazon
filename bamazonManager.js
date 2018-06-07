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
        //  connection.end()
});
////////////////////////////////////////////////////
// function which prompts the user for what action they should take aka the start of the program
////////////////////////////////////////////////////
function start() {
    inquirer
        .prompt({
            name: "manager",
            type: "rawlist",
            message: "MAKE A SELECTION",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD INVENTORY", "ADD NEW PRODUCT"]
        })

    .then(function(answer) {
        // based on their answer, either call the correct function
        if (answer.manager === "VIEW PRODUCTS FOR SALE") {
            queryAllProducts();
        } else if (answer.manager === "VIEW LOW INVENTORY") {
            viewLow();
        } else if (answer.manager === "ADD INVENTORY") {
            addInvent();
        } else if (answer.manager === "ADD NEW PRODUCT") {
            addNewProduct();
        } else {
            console.log("INVALID SELECTION, TRY AGAIN.")
            start();
        }
    })
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
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
            }
        });
        for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
			);
		}

		//this console.logs the table
		console.log(table.toString());
        console.log("");
        ///////////////////////////////////////////////////////Old Table////////////////////////////////////////////////////////
        // console.log("ID | " + "Item | " + "Department | " + "Price | " + "Quantity");
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
        // }
        // console.log("");
        // console.log("--------------------------------------------------");
        // console.log("");
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        start();
    });
}
////////////////////////////////////////////////////
// function which displays only the low inventory
////////////////////////////////////////////////////
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, res) {
        if (err) throw err;
        var table = new Table({
			head: ['Item Id#', 'Product Name', 'Stock Quantity'],
			style: {
				head: ['yellow'],
				compact: true,
                colAligns: ['center'],
            },
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
            }
        });
        for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].stock_quantity]
			);
		}

		//this console.logs the table
		console.log(table.toString());
        console.log("");
        ///////////////////////////////////////Old Table///////////////////////////////////////////////////////////////
        // console.log("--------------------------------------------------");
        // console.log("");
        // console.log("ID | " + "Item | " + "Quantity");
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity)
        // }
        // console.log("");
        // console.log("--------------------------------------------------");
        // console.log("");
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        start();
    })
}
////////////////////////////////////////////////////
// function which displays only the inventory, this is used in the add inventory function
////////////////////////////////////////////////////
function invent() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table({
			head: ['Item Id#', 'Product Name', 'Stock Quantity'],
			style: {
				head: ['yellow'],
				compact: true,
                colAligns: ['center'],
            },
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
            }
        });
        for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].stock_quantity]
            );
        }
        //this console.logs the table
		console.log(table.toString());
        console.log("");
    })
    
}


		
////////////////////////////////////////////////////
// function which allows you to add to the inventory
////////////////////////////////////////////////////
function addInvent() {
    invent();
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
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
                    message: "What is the ID of the product you'd like to add inventory to?"
                }, {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to add?"
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

            connection.query(
                "UPDATE products SET ? WHERE ?", [{
                    stock_quantity: (parseInt(answer.quantity) + parseInt(chosenItem.stock_quantity))
                }, {
                    product_name: chosenItem.product_name
                }],
                function(err) {
                    if (err) throw err
                    var stockAdded = (parseInt(answer.quantity) + parseInt(chosenItem.stock_quantity))
                    console.log("");
                    console.log("--------------------------------------------------");
                    console.log("");
                    console.log("Inventory added successfully!");
                    console.log("");
                    console.log("Product: " + chosenItem.product_name + " | " + "New Quantity: " + stockAdded)
                    console.log("");
                    console.log("--------------------------------------------------");
                    console.log("");
                    start();
                }
            )
        })
    })
}
////////////////////////////////////////////////////
// function which allows you to add new product to the database
////////////////////////////////////////////////////
function addNewProduct() {
    inquirer
        .prompt([{
                name: "productName",
                type: "input",
                message: "What product would you like to add?"
            },

            {
                name: "productDepartment",
                type: "input",
                message: "What department would you like to add the product to?"
            },

            {
                name: "productPrice",
                type: "input",
                message: "What is the price of the new product?"
            },

            {
                name: "productQuantity",
                type: "input",
                message: "What is the quantity of the new product you're adding to the inventory?"
            }

        ])

    .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO products SET ?", {
                product_name: answer.productName,
                department_name: answer.productDepartment,
                price: answer.productPrice,
                stock_quantity: answer.productQuantity
            },
            function(err) {
                if (err) throw err;
                console.log("--------------------------------------------------");
                console.log("");
                console.log("Product added successfully!");
                console.log("--------------------------------------------------");
                console.log("");
                    // re-prompt the user for if they want to bid or post
                start();
            }
        );
    });
}