What DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;
USE employeeDB;

CREATE TABLE departments (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employeeRole (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INTEGER NULL,
  PRIMARY KEY (id)
);
CREATE TABLE employees (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NULL,
  manager_id INTEGER NULL,
  PRIMARY KEY (id)
);
SELECT * FROM departments;
SELECT * FROM employeeRole;
SELECT * FROM employee;