USE bamazon_db;

UPDATE products SET stock_quantity = stock_quantity - 2, product_sales = product_sales + (price * 2) WHERE item_id = 8;

SELECT DISTINCT D.department_id, D.department_name, D.over_head_costs, P.product_sales
FROM departments D JOIN products P
ON D.department_name = P.department_name
GROUP BY SUM(department_name)
ORDER BY department_id;


SELECT * FROM departments