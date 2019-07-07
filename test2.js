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
    if (err) throw "There was a problem connecting to Bamazon. Sorry for any inconvenience!" + err;
    start()
})

// make a function asking if customer wants to buy products
function start() {
    inquirer.prompt({
        name: "buyOrExit",
        type: "list",
        message: "Welcome to Bamazon! How may we help you today?",
        choices: ["Purchase an item", "Exit"]
    }).then(function(answer){
        if (answer.buyOrExit === "Purchase an item") {
            showProducts()
        } else {
            connection.end()
        }
    });
}

// function to show products to customers
function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw console.log("Error: " + err);
        itemListArray = []
        
        // making a for loop to read choices easier
        for(var i = 0; i < res.length; i++){
        console.log("------------------" +
            "\n" +
            "\n Item ID: " + res[i].item_id +
            "\n Product Selected: " + res[i].product +
            "\n Department: " + res[i].product +
            "\n Price: " + res[i].price + 
            "\n Quantity: "  + res[i].stock_quantity +
            "\n")
            itemListArray.push(res[i].item_id)
        }
        console.log(itemListArray)

        // chooseProducts(itemListArray)
        inquirer.prompt({
            name: "product",
            type: "input",
            message: "Please select an Item ID you would like to buy."
    }).then(function(answer) {

        // first check to see if what customer choose is an item ID
        
        if (itemListArray.includes(answer.product) === false) { 
            console.log("We do not recognize that item. Please choose a different item.")
            showProducts()
            }
        
        var query = "SELECT item_id, product, department_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.product }, function(err, res){

            chosenItem = res[0]
            console.log(chosenItem)
            console.log(chosenItem.stock_quantity)
             // checking for errors first
             if (err) throw "Error was made selecting product: " + err

            else if (chosenItem.stock_quantity === 0) {
                console.log("We are temporarily out of stock of that item.")
                start()

            } else {

                // show details of product
                console.log("\n Product Selected: " + res[0].product +
                "\n Department: " + res[0].product +
                "\n Price: " + res[0].price + 
                "\n Quantity: "  + res[0].stock_quantity +
                "\n")
    
                // store item that customer bought and put it in callback
                buyProduct(chosenItem)
                }   
            })
        })
    })
}

// create prompt for customer to select product

// function chooseProducts(list){
    
   
      
//             console.log(chosenItem)
//             console.log(list)
//             console.log(answer.product)

//             // checking for errors first
//             if (err) throw "Error was made selecting product: " + err

//             else if (chosenItem.stock_quantity === 0) {
//             console.log("We are temporarily out of stock of that item.")
//             start()

//             } else if (!list.includes(answer.product)) { 
//                 console.log("We do not recognize that item. Please choose a different item.")
//                 start()

//             } else {

//             // show details of product
//             console.log("\n Product Selected: " + res[0].product +
//             "\n Department: " + res[0].product +
//             "\n Price: " + res[0].price + 
//             "\n Quantity: "  + res[0].stock_quantity +
//             "\n")

//             // store item that customer bought and put it in callback
//             buyProduct(chosenItem)
//             }   
//         })
//     })
// }


// function so customer can choose and buy product

function buyProduct(item){
    inquirer
    .prompt({
        name: "amount",
        type: "input",
        message: "How many items do you wish to purchase?"
    })
    .then(function(answer) {

        // need to store total cost of purchase and amount customer is purchasing.
        totalCost = (item.price * answer.amount)
        quantityAmount = answer.amount

        // if enough is in inventory, will prompt if customer wants to continue purchase
        if(item.stock_quantity >= answer.amount) {
        inquirer.prompt({
            name: "verify_purchase",
            type: "list",
            message: `The total amount is $${totalCost}. Do you wish to continue?`,
            choices: ["YES", "NO"]
            }).then(function(reply){

                // if customer chooses to buy product:
                if( reply.verify_purchase === "YES"){
                    query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
                    connection.query(query, [quantityAmount, item.item_id], function(err, res) {
                    if (err) throw console.log ("Error occured when applying update to database. " + err)
                    console.log("Thank you for your purchase!")
                    start()
                    })

                } else {
                    console.log("Let's search for another item.")
                    start()
                    }            
                })
            }

        else{
            (console.log("\n We're sorry, but at this time do not enough in inventory to fulfill that order." + "\n"))
            start()
        }
    })

}