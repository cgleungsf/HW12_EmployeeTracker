const inquirer = require("inquirer");

const mysql = require("mysql");

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
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
                "Update employee managers",
                "View employees by manager",
                // "Delete departments, roles, and employees",
                // "View the total utilized budget of a department",
                "Exit"
            ],
        })
        .then(answer => {
            switch (answer.mainMenuTask) {
                case "Add departments, roles, employees":
                    addInformation();
                    break;
                case "View departments, roles, employees":
                    viewInformation();
                    break;
                case "Update employee roles":
                    updateEmployeeRole();
                    break;
                case "Update employee managers":
                    updateManager();
                    break;
                case "View employees by manager":
                    employeeManager();
                    break;
                // case "Delete departments, roles, and employees":
                //     deleteInformation();
                //     break;
                // case "View the total utilized budget of a department":
                //     viewBudget();
                //     break;
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
            name: "mainMenuTask",
            message: "Which would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee"
            ],
        })
        .then(answer => {
            switch (answer.mainMenuTask) {
                case "Department":
                    inquirer.prompt({
                        type: "input",
                        name: "newDepartment",
                        message: "What is the name of the department?"
                    }).then(answer => {
                        const query = `INSERT INTO departments (name) VALUES ("${answer.newDepartment}")`;
                        connection.query(query, answer.newDepartment, (err, res) => {
                            if (err) throw err;
                            connection.query(`SELECT * FROM departments`, answer.name, (err, res) => {
                                if (err) throw err;
                                console.table(res);
                                mainMenu();
                            })
                        })
                    })
                    break;
                case "Role":
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
                            message: "What department will the position be in?"
                        }
                    ]).then(answer => {
                        const query = `INSERT INTO employeeRole(title, salary, department_id)
                                    VALUES ("${answer.title}",${answer.salary},${answer.departmentId})`;
                        console.log(query)
                        connection.query(query, answer.title, (err, res) => {
                            if (err) throw err;
                            connection.query(`SELECT * FROM employeeRole`, answer.title, (err, res) => {
                                if (err) throw err;
                                console.table(res);
                                mainMenu();
                            })
                        })
                    })
                    break;
                case "Employee":
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
                        const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES ("${answer.firstName}","${answer.lastName}",${answer.roleId},${answer.managerId})`;
                        console.log(query)
                        connection.query(query, answer.firstName, (err, res) => {
                            if (err) throw err;
                            connection.query(`SELECT * FROM employees`, answer.firstName, (err, res) => {
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
};

// * View departments, roles, employees
const viewInformation = () => {
    inquirer
        .prompt({
            type: "list",
            name: "tableView",
            message: "Which table would you like to view?",
            choices: [
                "Deparments",
                "Roles",
                "Employees",
            ],
        })
        .then(answer => {
            switch (answer.tableView) {
                case "Deparments":
                    connection.query(`SELECT * FROM departments`, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        mainMenu();
                    })
                    break;
                case "Roles":
                    connection.query(`SELECT * FROM employeeRole`, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        mainMenu();
                    })
                    break;
                case "Employees":
                    connection.query(`SELECT * FROM employees`, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        mainMenu();
                    })
                    break;
            }
        });
};

// * Update employee roles -------------------NEED CLARIFICATION-------------------------
const updateEmployeeRole = () => {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "employeeId",
                    message: "Please enter the employee id whose manager will be updated.",
                },
                {
                    type: "input",
                    name: "managerUpdate",
                    message: "Please enter the new manager id",
                }
            ])
            .then(answer => {
                const query = `UPDATE employees SET manager_id = ${answer.managerUpdate} WHERE id = ${answer.employeeId}`
                connection.query(query, (err, res) => {
                    connection.query(`SELECT * FROM employees`, answer.name, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    mainMenu();
                    })
                })
            })
    }



// * Update employee managers
const updateManager = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employeeId",
                message: "Please enter the employee id whose manager will be updated.",
            },
            {
                type: "input",
                name: "managerUpdate",
                message: "Please enter the new manager id",
            }
        ])
        .then(answer => {
            const query = `UPDATE employees SET manager_id = ${answer.managerUpdate} WHERE id = ${answer.employeeId}`
            connection.query(query, (err, res) => {
                connection.query(`SELECT * FROM employees`, answer.name, (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
                })
            })
        })
}

// * View employees by manager
const employeeManager = () => {
    inquirer
        .prompt({
            type: "input",
            name: "managerCensus",
            message: "Please enter a manager id to see a table employees managed.",
        })
        .then(answer => {

            connection.query(`SELECT first_name, last_name FROM employees WHERE manager_id = ${answer.managerCensus}`, (err, res) => {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })
        })
}

// * Delete departments, roles, and employees


// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
