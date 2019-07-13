// Create a new MySQL table called departments. Your table should include the following columns:



// department_id
// department_name
// over_head_costs (A dummy number you set for each department)



// Modify the products table so that there 's a product_sales column, and modify your bamazonCustomer.js 
// app so that when a customer purchases anything from the store, the price of the product multiplied by 
// the quantity purchased is added to the product's product_sales column.



// Make sure your app still updates the inventory listed in the products column.

// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

// View Product Sales by Department
// Create New Department



var inquirer = require("inquirer")
var mysql = require("mysql")
var Table = require("cli-table")
var chalk = require("chalk")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function(err){
    if (err) throw "There was a problem starting program." + err;
    start()
})

function start() {
    inquirer.prompt({
        name: "select",
        type: "list",
        message: "Welcome to Bamazon Supervisor View",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
    }).then(function(answer){

        switch (answer.select) {

            case "View Product Sales by Department":
                viewProductSales();
                break;

            case "Create New Department":
                createNewDep()
                break;

            case "Exit":
                connection.end()
                break;
        }
    })
}

function viewProductSales(){
    query = "SELECT * FROM departments"
    connection.query(query, function(err, res){
        if(err) throw "Error: " + err;
            table = new Table({
                head: ["Departmnet ID", "Department Name", "Over Head Costs"]
            })
            for(var i = 0; i < res.length; i++){
                department = res[i].department_id
                depName = res[i].department_name
                overHeadCost = res[i].over_head_costs
                   table.push ([department, depName, overHeadCost])
            }
            console.log("\n" + table.toString() + "\n")
        })
        start() 
    }

