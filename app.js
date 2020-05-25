const inquirer = require("inquirer");

const mysql = require("mysql");

let currentData;


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeeDB",
});
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
});
const mainMenu = () => {
    inquirer
        .prompt({
            type: "list",
            name: "mainMenuTask",
            message: "Please select from the following:",
            choices: [
                "Add department, role, or employee",
                "View departments, roles, and employees",
                "Update employee roles",
                "Exit"
            ],
        })
        .then(answer => {
            switch (answer.mainMenuTask) {
                case "Add department, role, or employee":
                    addInformation();
                    break;
                case "View departments, roles, and employees":
                    viewInformation();
                    break;
                case "Update employee roles":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    connection.end();
                    break;
            }
        });
};
// "Add departments, roles, employees",
const addInformation = () => {
    inquirer
        .prompt({
            type: "list",
            name: "addedInfo",
            message: "Which would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee"
            ],
        })
        .then(answer => {
            switch (answer.addedInfo) {
                case "Department":
                    const dep_query =
                        'SELECT * FROM departments;'
                    connection.query(dep_query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        inquirer.prompt({
                            type: "input",
                            name: "newDepartment",
                            message: "What is the name of the department?"
                        }).then(answer => {
                            const query = `INSERT INTO departments (department_name) VALUES ("${answer.newDepartment}")`;
                            connection.query(query, answer.newDepartment, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM departments`, answer.name, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                    })
                    break;
                case "Role":
                    const role_query =
                        'SELECT * FROM employeeRole;'
                    connection.query(role_query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "title",
                                message: "What is the position title?"
                            },
                            {
                                type: "input",
                                name: "salary",
                                message: "What is the budgeted salary?"
                            },
                            {
                                type: "input",
                                name: "departmentId",
                                message: "What department will the position be in? (Enter Department ID)"
                            }
                        ]).then(answer => {
                            const query = `INSERT INTO employeeRole(title, salary, department_id)
                                    VALUES ("${answer.title}",${answer.salary},${answer.departmentId})`;
                            connection.query(query, answer.title, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM employeeRole`, answer.title, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                    })
                    break;
                case "Employee":
                    const employee_query =
                        'SELECT * from employees;'
                    connection.query(employee_query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "firstName",
                                message: "What is the employee's first name?"
                            },
                            {
                                type: "input",
                                name: "lastName",
                                message: "What is the employee's last name?"
                            },
                            {
                                type: "input",
                                name: "roleId",
                                message: "What is their role id?"
                            },
                            {
                                type: "input",
                                name: "managerId",
                                message: "What is their manager's manager id?"
                            }
                        ]).then(answer => {
                            const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}",${answer.roleId},${answer.managerId})`;
                            // console.log(query)
                            connection.query(query, answer.firstName, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM employees`, answer.firstName, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                    })
                    break;
                default:
                    connection.end();
                    break;
            }
        });
};

// * View departments, roles, employees
const viewInformation = () => {
    const query =
        "SELECT first_name, last_name, title, department_name, salary, manager_id FROM employees JOIN employeeRole ON employees.role_id = employeeRole.role_id JOIN departments ON employeeRole.department_id = departments.department_id;"
    connection.query(query, (err, res) => {
        if (err) throw err;
        currentData = res;
        console.log(" ");
        console.table(res);
        mainMenu();
    })
};

// * Update employee roles
const updateEmployeeRole = () => {
    const query =
        'SELECT * from employeeRole'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("Employee Roles: ");
        console.table(res);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "employeeId",
                    message: "Please enter the employee id whose role will be updated:",
                },
                {
                    type: "list",
                    name: "employeeUpdate",
                    message: "Which would you like to update",
                    choices: [
                        "Title",
                        "Salary",
                        "Department ID"
                    ]
                }
            ])
            .then(data => {
                switch (data.employeeUpdate) {
                    case "Title":
                        inquirer.prompt({
                            type: "input",
                            name: "titleUpdate",
                            message: "What is the new title?"
                        }).then(answer => {
                            const query = `UPDATE employeeRole SET title = "${answer.titleUpdate}" WHERE role_id = ${data.employeeId}`
                            connection.query(query, answer.titleUdate, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM employeeRole`, answer.title, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                        break;
                    case "Salary":
                        inquirer.prompt({
                            type: "input",
                            name: "salaryUpdate",
                            message: "What is the new salary?"
                        }).then(answer => {
                            const query = `UPDATE employeeRole SET salary = ${answer.salaryUpdate} WHERE role_id = ${data.employeeId}`
                            connection.query(query, answer.salaryUdate, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM employeeRole`, answer.name, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                        break;
                    case "Department ID":
                        inquirer.prompt({
                            type: "input",
                            name: "departmentUpdate",
                            message: "What is the new department ID?"
                        }).then(answer => {
                            const query = `UPDATE employeeRole SET department_id = ${answer.departmentUpdate} WHERE role_id = ${data.employeeId}`
                            connection.query(query, answer.departmentUdate, (err, res) => {
                                if (err) throw err;
                                connection.query(`SELECT * FROM employeeRole`, answer.title, (err, res) => {
                                    if (err) throw err;
                                    console.table(res);
                                    mainMenu();
                                })
                            })
                        })
                        break;
                    default:
                        connection.end();
                        break;
                }
            });
    })


};
