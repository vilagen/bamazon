// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// Then create a Node application called bamazonCustomer.js. 
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.



// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function(err) {
    if (err) throw err;
    showProducts()
})

function showProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw console.log("Error: " + err);
        console.log(results)
        searchProducts()
    })
}

// create prompt for customer to select product

function searchProducts(){
    inquirer
    .prompt({
        name: "product",
        type: "input",
        message: "Please select an Item ID you would like to buy."
    })
    .then(function(answer) {
        var query = "SELECT item_id, product, department_name, price, stock_quantity FROM products WHERE ?";
        console.log(query)
        connection.query(query, { item_id: answer.product }, function(err, res){
          if (err) throw err //console.log("Error was made selecting product: " + err)
        console.log("\n Product Selected: " + res[0].product +
        "\n Department: " + res[0].product +
        "\n Price: " + res[0].price + 
        "\n Quantity: "  + res[0].stock_quantity)
        chosenItem = res[0]
        if(chosenItem.stock_quantity > 0) {
            buyProduct(chosenItem)
        }
        else(
            console.log("We are temporarily out of stock of that item.")
        )
        })
   })
}

// create prompt so customer can buy product

function buyProduct(item){
    inquirer
    .prompt({
        name: "amount",
        type: "input",
        message: "How many items do you wish to purchase?"
    })
    .then(function(answer) {
        totalcost = (item.price * answer.amount)
        buyingamount = answer.amount
        (console.log(`Your amount total will be ${amount}.`))
        if(item.stock_quantity >= answer.amount) {
            console.log("test passed")
            console.log(item.stock_quantity)
            console.log(item.item_id)
            query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
            connection.query(query, [answer.amount, item.item_id], function(err, res) {
                if (err) throw console.log ("Error occured when applying update to database. " + err)
                console.log("Thank you for your purchase!")
                showProducts()
            })
            
        }
        else{
            (console.log("Not enough in inventory."))
            searchProducts()
        }
    })

}
// need to prompt for amount they wish to buy
// make sure it updates the db to lower the amount of quantity on the db.
