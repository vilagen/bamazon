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
        chooseProducts(itemListArray)
    })
}

// create prompt for customer to select product

function chooseProducts(item){
    inquirer
    .prompt({
        name: "product",
        type: "input",
        message: "Please select an Item ID you would like to buy."
    })
    .then(function(answer) {

        // make sure that item that was chosen is an item_id
        // need to parseInt because will recognize answer as a string instead of integer. That drove me insane.
        if (!item.includes(parseInt(answer.product))) { 

            // inquire if customer wishes to continue shopping if the item isn't recognized
            inquirer.prompt({
                name: "ContOrExit",
                type: "list",
                message: "\n We do not recognize that item. Would you like to continue shopping? \n",
                choices: ["Continue Shopping", "Exit"]
            }).then(function(answer){
                if(answer.ContOrExit === "Continue Shopping") {
                    showProducts()
                } else {
                    connection.end()
                } 
            })
        }

            //continue purchase if in stock
            else {    
            var query = "SELECT item_id, product, department_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.product }, function(err, res){
                if (err) throw "Error was made selecting product: " + err
                
                // show details of product
                console.log("\n Product Selected: " + res[0].product +
                "\n Department: " + res[0].product +
                "\n Price: " + res[0].price + 
                "\n Quantity: "  + res[0].stock_quantity +
                "\n")

                // store item that customer bought and put it in callback
                chosenItem = res[0]    
                if(chosenItem.stock_quantity > 0) {
                    buyProduct(chosenItem)

                } else {
                    console.log("\n We're sorry, but at this time we are temporarily out of stock of that item. \n")
                    start()
                }
            })
        } 
    })
}

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
            message: `\nThe total amount is $${totalCost}. Do you wish to continue?\n`,
            choices: ["YES", "NO"]
            }).then(function(reply){

                // if customer chooses to buy product:
                if( reply.verify_purchase === "YES"){
                    query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
                    connection.query(query, [quantityAmount, item.item_id], function(err, res) {
                    if (err) throw console.log ("Error occured when applying update to database. " + err)
                    console.log("\n Thank you for your purchase! \n")
                    start()
                    })

                } else {
                    start()
                    }            
                })
            }

        else{
            (console.log("\n We're sorry, but at this time we do not have enough of that item to fulfill your request." + "\n"))
            start()
        }
    })
}
