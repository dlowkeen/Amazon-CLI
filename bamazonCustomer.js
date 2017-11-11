// Node Packages
// -------------------------------------------------------
var mysql = require('mysql');
var inquirer = require('inquirer');

// MySQL Conection Setup
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // Initiate function
    displayAllInfo();
});


// Functions 
// --------------------------------------------------------
function displayAllInfo() {
    console.log("Products available for purchase!");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price);
            }
        }
    });
    salePrompt();
}

function salePrompt() {
    inquirer.prompt([{
            name: "item",
            type: "list",
            message: "What product would you like to buy?",
            choices: [
                "Panini Press",
                "Toaster",
                "Cutlery Set",
                "Basketball",
                "Athletic Shoes",
                "Flannel Jacket",
                "Football",
                "Tooth Brush",
                "24-pack Water",
                "Chicken Breast"
            ]
        }, {
            name: "quantity",
            message: "How many would you like to purchase?"
        }])
        .then(function(answer) {
        	// if/else statement to determine if we have inventory on hand

        	// if we do, then execute the update function
        	var query = connection.query()

        	// if not, console.log we are out of stock
            console.log(answer.item + answer.quantity);
        })
    connection.end();
}