DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE  products(
    item_id INTEGER(12) AUTO_INCREMENT NOT NULL,
    product VARCHAR(150),
    department_name VARCHAR(150),
    price DECIMAL(12,2),
    stock_quantity INTEGER,
    product_sales DECIMAL(12,2),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product, department_name, price, stock_quantity, product_sales) 
VALUES ("Nintendo Switch", "Video Games", 298.99, 25, 3189.99), ("AMD Processor", "Computer", 199.00, 8, 995.00),
("Gray Shoes", "Clothing", 29.95, 10, 449.25), ("Fan", "Home", 15.50, 50, 496.00), ("Cool Wallet", "Fashion", 19.95, 18, 279.30),
("Air Mattress", "Home", 69.95, 13, 489.65), ("Computer Desk", "Home", 109.85, 3, 219.70),
("Super Jump 2", "Video Games", 59.99, 45, 1739.71), ("Headphones", "Electronics", 24.99, 12, 224.91),
("HD TV", "Televisions", 359.98, 7, 1439.92), ("Guitar", "Musical Instruments",  149.99, 9, 1499.90);

CREATE TABLE  departments(
    department_id INTEGER(12) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(150),
    over_head_costs DECIMAL(12,2),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES("Gaming", 432.00), ("Computer", 125.65), ("Clothing", 345.54), ("Home", 385.85), ("Fashion", 140.65),
("Electronics", 205.21), ("Televisions", 151.14), ("Musical Instruments", 201.99), ("Cell Phones", 101.52);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'