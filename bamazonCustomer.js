// Node Packages
// -------------------------------------------------------
var mysql = require('mysql');
var inquirer = require('inquirer');

var newStockQuantity = "";
var productChanged = "";

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
	initialQuestion();
});


// Functions 
// --------------------------------------------------------
function initialQuestion() {
    inquirer.prompt({
    	name: "task",
    	type: "list",
    	message: "What would you like to do?",
    	choices: [
    		"View/Buy Products",
    		"Finish Shopping"
    	]
    })
    .then(function(answer) {
    	switch (answer.task) {
    		case "View/Buy Products":
    			displayAllInfo();
    			break;
    		case "Finish Shopping":
    			console.log("Thank you for shopping with us");
    			connection.end();
    			break;
    	}


    })
}

function displayAllInfo() {
    console.log("Products available for purchase!");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: " + res[i].price);
            }
        }
    	salePrompt();
    })
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
            var query = "SELECT product_name, stock_quantity FROM products WHERE?";
            connection.query(query, { product_name: answer.item }, function(err, res) {
                if (err) throw err;
                if (res[0].stock_quantity > answer.quantity) {
                    console.log("It's in stock!");
                    newStockQuantity = parseFLoat(res[0].stock_quantity) - parseFloat(answer.quantity);
                    productChanged = answer.item;
                    // If we do, execute buyProduct function
                    var query = connection.query("UPDATE products SET ? WHERE?",
                        [{
                                stock_quantity: newStockQuantity
                            },
                            {
                                product_name: productChanged
                            }
                        ])
                } else {
                    console.log("Sorry, we don't have enough on hand to fulfill that order");
                }
            initialQuestion();
            });
        })
}

