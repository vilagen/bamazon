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
    searchProducts()
})

function showProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw console.log("Error: " + err);
        console.log(results)
    })
}

// create prompt for id and how mnay customer wishes to buy

function searchProducts(){
    inquirer
    .prompt({
        name: "product",
        type: "input",
        message: "Please select an Item ID you would like to buy."
    })
    .then(function(answer) {
        var query = "SELECT product, department_name, price, stock_quantity FROM products WHERE ?";
        console.log(query)
        connection.query(query, { item_id: answer.product }, function(err, res){
          if (err) throw err //console.log("Error was made selecting product: " + err)
        console.log("\n Product Selected: " + res[0].product +
        "\n Department: " + res[0].product +
        "\n Price: " + res[0].price + 
        "\n Quantity"  + res[0].stock_quantity)
        })
        showProducts()
   })
}