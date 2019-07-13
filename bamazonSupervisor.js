var inquirer = require("inquirer")
var mysql = require("mysql")
var table = require("table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.coonnect(function(err){
    
})