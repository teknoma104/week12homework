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

### NPM Packages Required

The following NPM packages are needed for this app to run properly:

    * MySQL
    * Inquirer

### App Functionality Explained

* The products table is already populated with 10 rows of randomly generated data for each of the data fields

* bamazonCustomer.js
    * This is from the customer's point of view.
    * When you run this app it will first display all of the available item names to purchase from the products table as well as their item IDs and their prices
        ![bamazonCustomer.js - Initial Menu View](/screenshots/bamazonCustomer/bamazonCustomer_-_1_-_Initial_menu.png)
    * Then it prompts the user asking if they want to buy something or not
        * If the user types y or yes then it proceeds to the buying process
        * If the user type n or no then the app will close
    * Buying process
        * Here the app will prompt the user twice:
            * First giving a list of product names for the user to select which item to buy then
                ![bamazonCustomer.js - Selecting products from list](/screenshots/bamazonCustomer/bamazonCustomer_-_2_-_Select_products_from_list.png)
            * Second asking the user the quantity they want to purchase of the item they selected in the first prompt
                ![bamazonCustomer.js - Entering quantity to buy](/screenshots/bamazonCustomer/bamazonCustomer_-_3_-_Enter_quantity_to_buy.png)
        * Then the app will verify if the purchase can be made, comparing the user's desired quantity to buy against the stock quantity left in the products table for that product name
            * If there is enough stock quantity then the purchase can be made and the app will verify this with a message displayed to the user while calling the update function to update stock quantity (minus the user's desired quantity purchased)
                ![bamazonCustomer.js - Successful transaction](/screenshots/bamazonCustomer/bamazonCustomer_-_4_-_successful_transaction.png)
            * If the stock quantity is not enough for the user's desired purchase quantity, the app will display related messaging saying it cannot go through with the purchase
                ![bamazonCustomer.js - Unsuccessful transaction](/screenshots/bamazonCustomer/bamazonCustomer_-_5_-_unsuccessful_transaction.png)


* bamazonManager.js
    * This is from the manager's point of view.
    * When you run this app it will first prompt the manager asking what they would like to do. Possible actions below:
        ![bamazonManager.js - manager initial menu](/screenshots/bamazonManager/bamazonManager_-_1_-_initial_menu.png)
        * View Products for Sale
            * Description:  Simply displays all products available in the products database. Displays the following attribute below:
                * item_id
                * product_name
                * price
                * stock_quantity
            ![bamazonManager.js - view products for sale](/screenshots/bamazonManager/bamazonManager_-_2_-_view_products_for_sale.png)
        * View Low Inventory
            * Description:  Displays products that have stock quantity below a certain threshold (here it is 100 because there are many products with more than 500+ stock)
            ![bamazonManager.js - viewing products with low inventory](/screenshots/bamazonManager/bamazonManager_-_3_-_view_products_with_low_inventory.png)
        * Add to Inventory
            * Description:  Allows the manager to add more stock to a product. It will ask the manager to select the product from a list then ask how much stock to add to it.
            ![bamazonManager.js - selecting option to add stock to an exisitng product](/screenshots/bamazonManager/bamazonManager_-_4_-_add_stock_to_existing_product.png)
            ![bamazonManager.js - entering stock quantity to add on top of existing stock](/screenshots/bamazonManager/bamazonManager_-_5_-_entering_quantity_for_stock.png)
            ![bamazonManager.js - successfully added stock](/screenshots/bamazonManager/bamazonManager_-_6_-_successfully_added_stock.png)

        * Add New Product
            * Description:  Allows the manager to add a new product into the products database
            ![bamazonManager.js - adding brand new product to products database](/screenshots/bamazonManager/bamazonManager_-_7_-_adding_new_product_to_products_db.png)
