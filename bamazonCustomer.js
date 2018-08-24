// npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// array variable to store all of the item names
var productArray = [];



// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which which list all items for sale, along with price and item id then prompts user if they wish to buying something
function start() {
    console.log("\nWelcome to Bamazon. The following items are available for sale.");
    console.log("===============================================================");

    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;

        // console.log(results.length);
        // console.log(results);

        for (var x = 0; x < results.length; x++) {
            console.log("ID#: " + results[x].item_id + ", '" + results[x].product_name + "', Price: $" + results[x].price);
            productArray.push(results[x].product_name);
        }

        console.log("");

        // inquirer prompt asking user if they wish to buy something or not
        inquirer
            .prompt({
                name: "buyOrNot",
                type: "confirm",
                message: "Would you like to buy something from Bamazon at this time?"
            })
            .then(function (answer) {
                // console.log(answer);

                // based on their answer, either call buyScreen() function or display message thanking user + ending mysql db connection
                if (answer.buyOrNot === true) {
                    buyScreen();
                }
                else {
                    console.log("Thank you for shopping at Bamazon. Good bye!");
                    connection.end();
                }
            });
    });

}

// function to handle the buying process 
function buyScreen() {
    // inquirer prompts (which item to buy and how many of it)
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                choices: productArray,
                message: "What is the item you would like to submit?"
            },
            {
                name: "quantityPurchase",
                type: "input",
                message: "How many would you like to buy?"
            }
        ])
        .then(function (answer) {
            var productName = answer.item;
            var quantityPurchased = answer.quantityPurchase;


            var query = "SELECT * FROM products WHERE ?"

            // console.log(answer);

            console.log("Confirming your order..");

            // connection query using mysql select searching in the bamazon product db for the row matching the product name the person wants and checking the quantity
            // if when the test for the current stock minus the customer's desired quantity to purchase is less than 0, display an message saying unable to fulfill order
            // otherwise if the test condition comes out positive, confirm to user that bamazon can fulfill the order then call updateProduct function while passing the product name and desired quantity to purchase as parameters
            connection.query(query, { product_name: productName }, function (err, res) {
                if (err) throw err;

                var stock = res[0].stock_quantity;
                var productPrice = res[0].price;
                var total = productPrice * quantityPurchased;

                // console.log("Current stock at: " + stock);
                // console.log("Customer's desired quantity:  " + quantityPurchased + "\n");

                if ((stock - quantityPurchased) > 0) {
                    console.log("We are able to fulfill your order.");

                    var newStockQuantity = stock - quantityPurchased;

                    console.log("Your purchase order:");
                    console.log(productName + " ($" + productPrice + ") x " + quantityPurchased + " = $" + total);
                    updateProduct(productName, newStockQuantity);
                } else {
                    console.log("Sorry, we do not have enough stock in our inventory to fulfill your order.");
                    connection.end();
                }
            }
            );

        });
}

function updateProduct(productName, stock) {
    console.log("\nUpdating Bamazon products DB with customer order quantity...\n");

    // connection query to update the stock quantity in the bamazon's products db
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock
            },
            {
                product_name: productName
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " products updated!\n");
            connection.end();
        }
    );
    // logs the actual query being run
    // console.log(query.sql);
}
