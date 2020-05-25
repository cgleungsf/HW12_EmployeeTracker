DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;
USE employeeDB;

CREATE TABLE departments (
  department_id INTEGER NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE employeeRole (
  role_id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INTEGER NULL,
  PRIMARY KEY (role_id)
);
CREATE TABLE employees (
  employee_id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NULL,
  manager_id INTEGER NULL,
  PRIMARY KEY (employee_id)
);
SELECT * FROM departments;
SELECT * FROM employeeRole;
SELECT * FROM employees;