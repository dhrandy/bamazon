DROP DATABASE IF EXISTS spitfireDB;
CREATE DATABASE spitfireDB;

USE spitfireDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Spark Drone", "Electronics", 399 , 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Gimbal", "Electronics", 129 , 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Owl Necklase", "Jewelry", 15 , 200 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Love to Code Shirt", "Clothing", 20 , 25 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aukey Dashcam", "Automotive", 199 , 5 );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("na", "na", 0 , 0 );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("na", "na", 0 , 0 );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("na", "na", 0 , 0 );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("na", "na", 0 , 0 );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("na", "na", 0 , 0 );

SELECT * FROM products;

