import userController from './../controllers/usersController';
import employeeController from '../controllers/employeeController';

import express from "express";

import userOneValidation from '../validations/users/getOne';
import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

import employeeCreateValidation from '../validations/employees/create';
import employeeOneValidation from '../validations/employees/getOne';


const routes = express.Router();

const user = new userController;

const employee = new employeeController;

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployees);
routes.post("/employees/create", employeeCreateValidation, employee.createEmployee);
routes.get("employees/:id", employeeOneValidation, employee.oneEmployee )


export default routes;