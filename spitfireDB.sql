DROP DATABASE IF EXISTS spitfireDB;
CREATE DATABASE spitfireDB;

USE spitfireDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price  DECIMAL(5,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Spark Drone", "Electronics", 399.99 , 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Gimbal", "Electronics", 129.99 , 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Owl Necklase", "Jewelry", 15.99 , 200 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Love to Code Shirt", "Clothing", 19.99 , 25 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aukey Dashcam", "Automotive", 199.99 , 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Custom Gaming PC", "Electronics", 1499.99 , 2 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Minecraft", "PC Game", 29.99 , 4 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("55 inch Roku 4K TV", "Electronics", 799.99 , 1 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dial Liquid Soap", "Health & Beauty", 4.99 , 50 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mcculloch Robotic Mower", "Outdoor", 1199.99 , 4 );

SELECT * FROM products;

