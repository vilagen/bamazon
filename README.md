# bamazon

Hello, and thank you for taking time to to look at my Bamazon assignment. This exercise was
made as a way to practice SQL databases and their interactions with them with node programs.
It was created solely by me. This exercise included making a database with a "products" 
table, which houses all of the items and their descriptions. (Item id, item name, department, 
quantity, and price.) The javascript files includes prompts and a few functions which includes
starting the connection, listing the products, choosing what someone wants to buy, and 
confirming the purchase.

During this project, the objective was to create a Node program that would allow a use to
check what items were in a store, and allow a user to choose what items they wish to buy,
the quantity they wish to purchase, and shows how much the price would be before the purchase. 
The other objective was to also log those changes on a SQL database. When a person "buys" a 
product, the database will update that table to lower the amount of that specific item on the
table it is in.

##What this program does:

When a user initiates the node program, there will be prompt asking if they wish to purchase
items, or leave. If the user exits, it will end the connection to the database, and also 
close the node program.


**Start of the program**

![Start](https://github.com/vilagen/bamazon/blob/master/pictures/startbam.PNG?raw=true)

If the user decides to continue to purchase a product, it will start connection to the SQL
database. There is a function set to show the list of items in a way that is readable. It 
shows the item id, item name, departmnet, quantity, and price. 

**Products listed from the SQL table**

![ProductList](https://github.com/vilagen/bamazon/blob/master/pictures/showProducts.PNG?raw=true)

The user is prompted to choose an item based on it's id. At this time, there are only 11
items, so someone could choose 1-11. There an if statement in place incase the user puts
in a choice that isn't an id, like 32, or even other characters such as 'ief', etc. It will
prompt if the person would like to continue shopping or exit the program.

**Checking if item_id chosen is a product in SQL table**

![itemIDCheck](https://github.com/vilagen/bamazon/blob/master/pictures/itemidcheck.PNG?raw=true)

Notice in the picture that item ID 10, "HD TV" has 0 items left? There is a statement in
place to see if the quantity of said item is more than 0. If it isn't, the user will get 
a message that there isn't any in stock, and will go back asking if they would like to
purchase an item or not.

**Result if item is out of stock**

![itemOutofStock](https://github.com/vilagen/bamazon/blob/master/pictures/outOfStock.PNG?raw=true)

If a user does choose an item they will to buy they will be asked how many of that item. 
Just like before, there is a check to make sure there is enough demand for that item. If
the user puts in an amount that is greater than the quantity of said item, it will prompt
the user that it is out of that item, and calls the start function.

**Results if there isn't enough quantity**

![notEnoughQuan](https://github.com/vilagen/bamazon/blob/master/pictures/noEnoughQuan.PNG?raw=true)

As long as the user inputs an item ID on the product table, and requests an amount equal
to or lower to the quantity on hand, then the node program will display the toal amount 
that it will cost, and will prompt if the person wishes to buy the product. Choosing no
returns the start function. Yes will finish the purchase, and update the SQL database to 
reflect the new total quantity available, and call the start function again.

**Process of "purchasing" a product**

![purchasing](https://github.com/vilagen/bamazon/blob/master/pictures/purchasing.PNG?raw=true)

When choosing to look at the list of products, the photo below shows that the quantity 
of item ID 11, "Guitar", changed from 9 to 6 after three of them were "purchased."

**Results showing quantity being updated after puchase**

![quanUpdate](https://github.com/vilagen/bamazon/blob/master/pictures/quanUpdate.PNG?raw=true)


###Plans for future updates:

The next planned goal for this program includes creating a new Node application called bamazonManager.js. 
Running this application will:

1. List a set of menu options:
2. View Products for Sale
3. View Low Inventory
4. Add to Inventory
5. Add New Product
6. If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
7. If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
8. If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
9. If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.