// Node Packages
// -------------------------------------------------------
var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');

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
function task() {
    inquirer.prompt({
            name: "task",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Finish Session"
            ]
        })
        .then(function(answer) {
            switch (answer.task) {
                case "View Products for Sale":
                    console.log("Viewing products");
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
                    console.log("You will be logged off now. Thank you.");
                    connection.end();
                    break;
            }
        })
}

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function viewSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        task();
    })
}

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function viewLow() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.table(res[i]);
            }
        }
        task();
    })
}

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    inquirer.prompt([{
            name: "item",
            type: "list",
            message: "What item would you like to add inventory to?",
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
            message: "How many would you like to add?"
        }])
        .then(function(answer) {
            var query = "SELECT product_name, stock_quantity FROM products WHERE?";
            connection.query(query, { product_name: answer.item }, function(err, res) {
                if (err) throw err;
                var newStockQuantity = parseFloat(res[0].stock_quantity) + parseFloat(answer.quantity);

                var query = connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newStockQuantity
                    },
                    {
                        product_name: answer.item
                    }
                ])

                task();
            })
        })
}

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addProduct() {
	inquirer.prompt([{
			name: "item_id",
			message: "What is the item_id of the product you'd like to add?"
		}, {
			name: "product_name",
			message: "What is the name of the product you'd like to add?"
		}, {
			name: "department_name",
			message: "What is the department of the product you'd like to add?"
		}, {
			name: "price",
			message: "What is the price of the product you'd like to add?"
		}, {
			name: "stock_quantity",
			message: "How many of this item would you like to add?"
	}])
	.then(function(answer) {
	    var query = connection.query(
	        "INSERT INTO products SET ?", {
	            item_id: answer.item_id,
	            product_name: answer.product_name,
	            department_name: answer.department_name,
	            price: answer.price,
	            stock_quantity: answer.stock_quantity
	        },
	        function(err, res) {
	            console.log("Product Inserted");
	            // Call updateSong AFTER the INSERT completes
	            task();
	        });
	})	    
};
