# Backend-DB
HR_PORTAL-Backend connection to Database 

# This code is created to connect Database to Backend
- The Backend code is pushed in the git respository.
- The code is in node.js language with DB connections.
- In this updated code only 3 API is required:
  1. POST /api/employees/add → Register an employee
  2. POST /api/employees/login → Login & get a token
  3. POST /api/templates/create → Create a template (use token)
  4. GET /api/templates/all → To Fetch all templates

# To use the Token for Creating a Template (USE POSTMAN TO TEST THEM)
- First you have to Register an employee
- Login with the correct credentials is required for Authorization.
- To create a new template:
  1. login with the correct Credentials a token will be generated.
  2. That token should be given as a input in Authorization variable in the HEADER Option of the POSTMAN.
  3. Then the input for creating template should be given (Title and Content).
  4. After that the name of the person who uploaded the template will be fetched from the token provided.

# The Database Creation
- The created Database is named "hrportals".
- It has 3 tables Employee and Templates.

## Tables which were considered are:
-------------------------------------------------------
HR and Admin fields |        Template fields
--------------------|----------------------------------
First Name          |        ID
Last Name           |        Title
Email               |        COntent
Password            |        Uploaded_by
Last_login          |        Created_at      
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
   3.1 HR table

    CREATE TABLE hr (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
------------------------------
    3.2 Admin table

    CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); 
------------------------------
   3.3 Template table

    CREATE TABLE templates (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      uploaded_by VARCHAR(100) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
------------------------------
4. To Run each table for viewing data stored in each of them using API
------------------------------
    SELECT * FROM hr;
------------------------------
    SELECT * FROM admin;
------------------------------
    SELECT * FROM templates;
------------------------------

