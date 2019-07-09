// Create a new Node application called bamazonManager.js. Running this application will:


// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var inquirer = require("inquirer")
var mysql = require("mysql")


connection.connect(function, (err){
    if (err) throw "Sorry, there was a problem connecting to Bamazon Manager app. " + err;
    start()
})


function start() {
inquirer.prompt({
    name: "EnterorExit",
    type: "list",
    choices: 
})
}