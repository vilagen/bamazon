var inquirer = require("inquirer")
var mysql = require("mysql")
var Table = require("cli-table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})


connection.connect(function(err){
    if (err) throw "Sorry, there was a problem connecting to Bamazon Manager app. " + err;
    start()
})

// create function to make prompts for manager to choose from
function start() {
inquirer.prompt({
    name: "EnterorExit",
    type: "list",
    message: "What would you like to do today?",
    choices: ["View Products for Sale", 
              "View Low Inventory", 
              "Add to Inventory", 
              "Add New Product", 
              "Exit"]
}).then(function(answer){
    
        switch (answer.EnterorExit) {
            
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInv();
                break;

            case "Add to Inventory":
                chooseItem();
                break;

            case "Add New Product":
                addNewItemProd();
                break;
            
            case "Exit":
                connection.end()
                break;
        }
    })
}





// view products on the database.
function viewProducts(){
    query = "SELECT item_id, product, department_name, stock_quantity FROM products"
    connection.query(query, function(err, res){
        if (err) throw console.log("Error: " + err);
        table = new Table({
            head: ["Item ID", "Product", "Department Name", "Quantity"]
         })
        for(var i = 0; i < res.length; i++){
            itemID = res[i].item_id
            product = res[i].product
            department = res[i].department_name
            quantity = res[i].stock_quantity
                table.push([itemID, product, department, quantity])
            }
        console.log("\n" + table.toString() + "\n")
        start()
    })
}

// function to view producsts that have less than 5 in quantity
function viewLowInv(){
    query = "SELECT item_id, product, department_name, stock_quantity FROM products WHERE stock_quantity < 5"
    connection.query(query, function(err, res){
        if(err) throw "Error: " + err;
        for(var i = 0; i < res.length; i++){
            console.log("------------------" +
            "\n" +
            "\n Item ID: " + res[i].item_id +
            "\n Product Selected: " + res[i].product +
            "\n Department: " + res[i].department_name +
            "\n Price: " + res[i].price + 
            "\n Quantity: "  + res[i].stock_quantity +
            "\n")
        }
        start()
    })
}

// function to first choose item to add quantity to
function chooseItem(){
    query = "SELECT item_id, product, stock_quantity FROM products"
    connection.query(query, function(err, res) {
        itemArrayList = []
        if (err) throw console.log("Error: " + err);
        table = new Table({
            head: ["Item ID", "Product", "Quantity"]
        })
        for(var i = 0; i < res.length; i++){
            itemID = res[i].item_id
            product = res[i].product
            quantity = res[i].stock_quantity
                table.push([itemID, product, quantity])
                itemArrayList.push(itemID)
            }
                console.log("\n" + table.toString() + "\n")

            //ask product to choose to add quantity to
            inquirer.prompt({
            name: "chooseToAdd",
            type: "input",
            message: "Select Item ID to add more quantity to."
        })
        .then(function(answer){

            // make sure that item was chosen is an item_id
            if(itemArrayList.includes(parseInt(answer.chooseToAdd))) {
                chooseQuery = "SELECT item_id, product, stock_quantity FROM products WHERE ?"
                connection.query(chooseQuery, { item_id: answer.chooseToAdd }, function(err, res){
                    if (err) throw "Error was made selecting product: " + err;
    
                    console.log("\n Item ID: " + res[0].item_id +
                    "\n Product Selected: " + res[0].product +
                    "\n Department: " + res[0].product +
                    "\n Quantity: "  + res[0].stock_quantity +
                    "\n")
    
                    chosenItem = res[0]
                    addToInv(chosenItem)
                })
    
            } else {
                console.log("\n That item doesn't seem to be in our inventory. \n")
                inquirer.prompt({
                    name: "contOrStartOver",
                    type: "list",
                    message: "\n What would you like to do?",
                    choices: ["Choose a different item", "Start Menu"]  
                })
                
                .then(function(answer2){
                    if(answer2.contOrStartOver === "Choose a different item"){
                        chooseItem()
                    } else {
                        start()
                    }
                })
            }
        })
    })
}

// function to ask and apply how much of item to add
function addToInv(item) {
inquirer.prompt({
    name: "addQuantity",
    type: "input",
    message: "Input the amount to add to quantity in stock"
    })
    .then(function(answer){
            
        // check if input was a number
        if(isNaN(answer.addQuantity)) {
            console.log("That is not a number. Please select a number.")
        
        } else {
            addToQuantity = answer.addQuantity
            addQuanQuery = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
            connection.query(addQuanQuery, [addToQuantity, item.item_id], function(err, res){
                if (err) throw "Error occured when adding stock to inventory. " + err
                console.log("\n The quantity was updated successfully. \n")
                start()
            })
        }
    })
}

// function to add new a new item in product table
function addNewItemProd(){
    inquirer.prompt([
        
        // get the name of the product
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product?",
        },

        // department product falls under
        {
            name: "department",
            type: "input",
            message: "What department does the product go into?",

        },

        // price of the product
        {
            name: "price",
            type: "input",
            message: "Set the price of the product. (Enter exact amount: example 300.00 or 499.99)."
        },

        {
            name: "quantity",
            type: "input",
            message: "Set the amount we have to sell."
        }
        ])
        .then(function(answer){
            console.log(answer.productName, answer.department, answer.price, answer.quantity)
            newProdQuery = "INSERT INTO products (product, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)"
            values = [answer.productName, answer.department, parseFloat(answer.price), parseInt(answer.quantity)]
            connection.query(newProdQuery, values)
            start()
        })
}