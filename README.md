# Week 12 Homework

### Overview

Node.js & MySQL activity creating an Amazon-like storefront. The app takes in orders from customers and deplete stock from the store's inventory.

### Features

The Bamazon MySQL products table contains the following columns:

   * item_id (used as the primary key and auto-incremented)
   * product_name   
   * department_name
   * price
   * stock_quantity

### Functionality Explained

* The products table is populated with 10 rows of randomly generated data for each of the data fields

* bamazonCustomer.js
    * This is from the customer point of view.
    * When you run this app it will first display all of the available item names to purchase from the products table as well as their item IDs and their prices
    * Then it prompts the user asking if they want to buy something or not
        * If the user types y or yes then it proceeds to the buying process
        * If the user type n or no then the app will close
    * Buying process
        * Here the app will prompt the user twice:
            * First giving a list of product names for the user to select which item to buy then
            * Second asking the user the quantity they want to purchase of the item they selected in the first prompt
        * Then the app will verify if the purchase can be made, comparing the user's desired quantity to buy against the stock quantity left in the products table for that product name
            * If there is enough stock quantity then the purchase can be made and the app will verify this with a message displayed to the user while calling the update function to update stock quantity (minus the user's desired quantity purchased)
            * If the stock quantity is not enough for the user's desired purchase quantity, the app will display related messaging saying it cannot go through with the purchase