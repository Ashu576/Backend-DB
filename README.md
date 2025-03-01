# Backend-DB
HR_PORTAL-Backend connection to Database 

# This code is created to connect Database to Backend
- The Backend code is pushed in the git respository.
- The code is in node.js language with DB connections.

# The Database Creation
- The created Database is named "hrportals".
- It has 2 tables Employee and Templates.

Fields which were considered are:
Employee fields     |        Template fields
--------------------|----------------------------------
Employee_ID         |        ID
Password            |        Title
last_login          |        Content
NULL                |        Employee_ID as Foreign key
NULL                |        created_by is Timestamp

- These fields can be updated or changed according to the requirement of Main project.

# To create this Database follow these cammands
CREATE DATABASE hrportal;
USE hrportal;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    uploaded_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES employees(name) ON DELETE SET NULL 
);

SELECT * FROM employees;
SELECT * FROM templates;

