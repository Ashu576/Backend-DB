# Backend-DB
HR_PORTAL-Backend connection to Database 

# This code is created to connect Database to Backend
- The Backend code is pushed in the git respository.
- The code is in node.js language with DB connections.

# The Database Creation
- The created Database is named "hrportals".
- It has 2 tables Employee and Templates.

Fields which were considered are:
-------------------------------------------------------
Employee fields     |        Template fields
--------------------|----------------------------------
Name                |        ID
Email               |        Title
Password            |        Content
Last_login          |        uploaded_by as Foreign key (refering employee name)
NULL                |        created_at is Timestamp
--------------------------------------------------------
- These fields can be updated or changed according to the requirement of Main project.

# To create this Database follow these cammands
------------------------------
1. To create Database:
------------------------------
    CREATE DATABASE hrportal;
------------------------------
2. To use the Database: 
(This command is important as it will help you to select a particular database, and create table in that particular selected Database)
------------------------------
    USE hrportal;
------------------------------
3. To create tables inside a Database with required fields:
-------------------------------
   3.1 Employee table

    CREATE TABLE employees (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL UNIQUE,
      email_id VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
------------------------------
   3.2 Template table

    CREATE TABLE templates (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      uploaded_by VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES employees(name) ON DELETE SET NULL 
    );
------------------------------
4. To Run each table for viewing data stored in each of them using API
------------------------------
    SELECT * FROM employees;
------------------------------
    SELECT * FROM templates;
------------------------------

