INSERT INTO departments (name)
VALUES ("Engineering"),
("Human Resources"),
("Administration");

INSERT INTO employeeRole(title, salary, department_id)
VALUES ("Assasin", 80000, 1),
("Peace Maker",60000 , 2),
("Manager", 100000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Arya", "Stark", 1, 1),
 ("John", "Snow", 3, 2),
 ("Sansa","Stark",2 , 1);


