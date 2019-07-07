DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE  products(
    item_id INTEGER(12) AUTO_INCREMENT NOT NULL,
    product VARCHAR(150),
    department_name VARCHAR(150),
    price DECIMAL(12,2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Gaming", 298.99, 25), ("AMD Processor", "Computer", 199.00, 8),
("Gray Shoes", "Clothing", 29.95, 10), ("Fan", "Home", 15.50, 50), ("Cool Wallet", "Fashion", 19.95, 18),
("Air Mattress", "Home", 69.95, 5), ("Computer Desk", "Home", 109.85, 3),
("Super Jump 2", "Video Games", 59.99, 45), ("Headphones", "Electronics", 24.99, 12),
("HD TV", "Televisions", 359.98, 7), ("Guitar", "Musical Instruments",  149.99, 9);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'