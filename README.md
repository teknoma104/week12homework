# Week 12 Homework

### Overview

Node.js & MySQL activity creating an Amazon-like storefront. The app takes in orders from customers and deplete stock from the store's inventory.

### Bamazon MySQL table

The Bamazon MySQL products table contains the following columns:

   * item_id (used as the primary key and auto-incremented)
   * product_name   
   * department_name
   * price
   * stock_quantity

### App Functionality Explained

* The products table is already populated with 10 rows of randomly generated data for each of the data fields

* bamazonCustomer.js
    * This is from the customer's point of view.
    * When you run this app it will first display all of the available item names to purchase from the products table as well as their item IDs and their prices
        (/screenshots/bamazonCustomer/bamazonCustomer - 1 - Initial menu.png)
    * Then it prompts the user asking if they want to buy something or not
        * If the user types y or yes then it proceeds to the buying process
        * If the user type n or no then the app will close
    * Buying process
        * Here the app will prompt the user twice:
            * First giving a list of product names for the user to select which item to buy then
                (/screenshots/bamazonCustomer/bamazonCustomer - 2 - Select products from list.png)
            * Second asking the user the quantity they want to purchase of the item they selected in the first prompt
                (/screenshots/bamazonCustomer/bamazonCustomer - 3 - Enter quantity to buy.png)
        * Then the app will verify if the purchase can be made, comparing the user's desired quantity to buy against the stock quantity left in the products table for that product name
            * If there is enough stock quantity then the purchase can be made and the app will verify this with a message displayed to the user while calling the update function to update stock quantity (minus the user's desired quantity purchased)
                (/screenshots/bamazonCustomer/bamazonCustomer - 4 - successful transaction.png)
            * If the stock quantity is not enough for the user's desired purchase quantity, the app will display related messaging saying it cannot go through with the purchase
                (/screenshots/bamazonCustomer/bamazonCustomer - 5 - unsuccessful transaction.png)


* bamazonManager.js
    * This is from the manager's point of view.
    * When you run this app it will first prompt the manager asking what they would like to do. Possible actions below:
        (/screenshots/bamazonManager/bamazonManager - 1 - initial menu.png)
        * View Products for Sale
            * Description:  Simply displays all products available in the products database. Displays the following attribute below:
                * item_id
                * product_name
                * price
                * stock_quantity
            (/screenshots/bamazonManager/bamazonManager - 2 - view products for sale.png)
        * View Low Inventory
            * Description:  Displays products that have stock quantity below a certain threshold (here it is 100 because there are many products with more than 500+ stock)
            (/screenshots/bamazonManager/bamazonManager - 3 - view products with low inventory.png)
        * Add to Inventory
            * Description:  Allows the manager to add more stock to a product. It will ask the manager to select the product from a list then ask how much stock to add to it.
            (/screenshots/bamazonManager/bamazonManager - 4 - add stock to existing product.png)
            (/screenshots/bamazonManager/bamazonManager - 5 - entering quantity for stock.png)
            (/screenshots/bamazonManager/bamazonManager - 6 - successfully added stock.png)

        * Add New Product
            * Description:  Allows the manager to add a new product into the products database
            (/screenshots/bamazonManager/bamazonManager - 7 - adding new product to products db.png)
