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
    managerStart();
});

function managerStart() {
    console.log("==============================================n");
    console.log("=========  Welcome Bamazon Manager!  =========");
    console.log("==============================================\n");

    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;

        // inquirer prompt asking user if they wish to buy something or not
        inquirer
            .prompt({
                name: "managerActions",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
                message: "What would you like to do at this time?"
            })
            .then(function (answer) {
                // console.log(answer);

                var choice = answer.managerActions;

                // based on their answer, either call buyScreen() function or display message thanking user + ending mysql db connection
                switch (choice) {
                    case "View Products for Sale":
                        return displayInventory(results);

                    case "View Low Inventory":
                        return viewLowInv();

                    case "Add to Inventory":
                        return addInv();

                    case "Add New Product":
                        return addProduct();

                    default:
                        console.log("Good bye!");
                        connection.end();
                        break;
                }
            });
    });

}

function displayInventory(results) {
    console.log("\nDisplaying current items for sale:");

    for (var x = 0; x < results.length; x++) {
        console.log("ID#: " + results[x].item_id + ", '" + results[x].product_name + "', Price: $" + results[x].price);
        productArray.push(results[x].product_name);
    }

    console.log("");

    managerStart();
}