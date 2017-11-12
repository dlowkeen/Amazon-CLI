// Node Packages
// -------------------------------------------------------
var inquirer = require('inquirer');
var mysql = require('mysql');
var console.table = require('console.table');

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
    task();
});

// Functions 
// --------------------------------------------------------
// Initial question function to ask what user would like to do
function task() = {
    inquirer.prompt({
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Finish"
        ]
    })
    .then(function(answer) {
    	switch(answer) {
    		case "View Products for Sale":
    			viewSale();
    			break;
    		case "View Low Inventory":
    			viewLow();
    			break;
    		case "Add to Inventory":
    			addInventory();
    			break;
    		case "Add New Product":
    			addProduct();
    			break;
    		case "Finish Session":
    			finish();
    			break;
    	}
    })
}

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewSale() {

}

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function viewLow() {

}

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {

}

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addProduct() {
	
}

// Ends the mysql connection and finishes the game
function finish() {
	console.log("You will be logged off now. Thank you.");
	connection.end();
}

