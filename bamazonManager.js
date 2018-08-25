// npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// array variable to store all of the item names
var productArray = [];

var products = [];

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

    console.log("==============================================n");
    console.log("=========  Welcome Bamazon Manager!  =========");
    console.log("==============================================\n");

    // run the start function after the connection is made to prompt the user
    managerStart();
});

function managerStart() {
    // Empties the arrays first of any pre-existing values before the next part adds into the arrays
    productArray = [];
    products = [];

    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;

        // pushes the item ID and name of the items into global productArray variable (to be used to display as a choices in inquirer prompts later)
        // also pushes the item into the global products array with all of its attributes intact
        for (var x = 0; x < results.length; x++) {
            productArray.push("ID#:" + results[x].item_id + ", " + results[x].product_name);
            products.push({ item_id: results[x].item_id, product_name: results[x].product_name, price: results[x].price, stock_quantity: results[x].stock_quantity });
        }

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
                        return viewLowInventory();

                    case "Add to Inventory":
                        return addInventory();

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
        console.log("ID#: " + results[x].item_id + ", '" + results[x].product_name + "', Price: $" + results[x].price + ", Stock Left: " + results[x].stock_quantity);
    }

    console.log("");

    managerStart();
}

function viewLowInventory() {
    console.log("\nDisplaying items low in stock (below 100 quantity):");

    // query the products db for any products that has stock below 100 (since when most of the product stocks is more than 500+)
    var query = connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <= ?", [100],
        function (err, res) {
            if (err) throw err;

            // console.log(res);

            for (var x = 0; x < res.length; x++) {
                console.log("ID#: " + res[x].item_id + ", '" + res[x].product_name + "', Current Stock: " + res[x].stock_quantity);
            }

            console.log("");

            managerStart();
        }
    );
}

function addInventory() {
    console.log("Time to add stock to a product!\n");

    inquirer
        .prompt([
            {
                name: "itemlist",
                type: "list",
                choices: productArray,
                message: "Which item do you want to add more stock to?"
            },
            {
                name: "quantityAdded",
                type: "input",
                message: "How much stock would you like to add?",
                validate: function (value) {
                    var reg = /^\d+$/;

                    return reg.test(value) || "Quantity should be a valid number!";
                }
            }
        ])
        .then(function (answer) {
            console.log(answer);

            var newStockTotal = 0;

            // doing some splitting to get the item ID# from the choices from the above inquirer list prompt
            var split1 = answer.itemlist.split(",", 1);
            console.log("split1:  " + split1);


            var split2 = split1[0].split(":", 2);
            console.log("split2:  " + split2);

            var final = split2[1];
            console.log("final:  " + final);

            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?", [final], function (err, results) {
                if (err) throw err;

                console.log(results);

                // parseInt to parse the string as integers
                newStockTotal = (parseInt(results[0].stock_quantity) + parseInt(answer.quantityAdded));
                console.log("newStockTotal:  " + newStockTotal);

                updateDatabase(final, newStockTotal, results[0].product_name);
            });

        });
}

function addProduct() {
    console.log("Time to add a new product!\n");

    function validateString(value) {
        if ((value !== "") && (isNaN(value)) && (value.length <= 100)) {
            return true;
        }

        // Error message if user tries to use a blank name
        if (value === "")
            console.log("\nERROR: Product name cannot be blank.")

        // Error message if user types in only numbers 
        else if (isNaN(value) === false)
            console.log("\nERROR: Numbers only detected, please type in a name for the new product name.");


        // Error message if user types in a name longer than 100 characters
        if (value.length > 100)
            console.log("\nERROR: Product name cannot contain more than 100 characters.")

        return false;
    }


    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new product's name? (100 characters max)",
            validate: validateString
        },
        {
            type: "input",
            name: "department",
            message: "What is the new product's department? (100 characters max)",
            validate: validateString
        },
        {
            type: "input",
            name: "price",
            message: "What is the new product's price?",
            validate: function (value) {
                var reg = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;;

                return reg.test(value) || "Not a valid price, should be a valid number!";
            }
        },
        {
            type: "input",
            name: "stock",
            message: "What is the new product's stock amount?",
            validate: function (value) {
                var reg = /^\d+$/;

                return reg.test(value) || "Quantity should be a valid number!";
            }
        }
    ]).then(function (newProduct) {

        var query = connection.query( "INSERT INTO products SET ?",
            {
                product_name: newProduct.name,
                department_name: newProduct.department,
                price: newProduct.price,
                stock_quantity: newProduct.stock
            },
            function (err, res) {
                if (err) throw err;

                console.log(res.affectedRows + " product inserted!\n");
                console.log(newProduct.name + " successfully added!");

                managerStart();
            }
        );
    });
}

function updateDatabase(itemID, newStockTotal, name) {
    console.log("\nProduct database will be updated shortly with new stock value..");

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStockTotal
            },
            {
                item_id: itemID
            }
        ],
        function (err, res) {
            if (err) throw err;

            console.log(name + "'s new stock quantity:  " + newStockTotal + "\n");
            // console.log(res.affectedRows + " product(s) updated!\n");

            managerStart();
        }
    );

}