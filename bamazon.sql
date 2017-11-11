DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  position INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT,
  UNIQUE (item_id),
  PRIMARY KEY (position)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)

VALUES
  (1000, "Panini Press", "Cooking", 19.99, 15),
  (2345, "Toaster", "Cooking", 12.99, 12),
  (5234, "Cutlery Set", "Cooking", 14.99, 21),
  (8769, "Basketball", "Sports", 28.79, 54),
  (1230, "Athletic Shorts", "Clothing", 11.99, 42),
  (7937, "Flannel Jacket", "Clothing", 18.99, 3),
  (2409, "Football", "Sports", 16.89, 15),
  (5824, "Tooth Brush", "Health", 2.99, 134),
  (4994, "24-pack Water", "Food", 1.99, 84),
  (4708, "Chicken Breast", "Food", 3.79, 16);
