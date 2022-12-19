import userController from './../controllers/usersController';
import express from "express";
import employeeController from '../controllers/employeeController';

import userOneValidation from '../validations/users/getOne';

import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

const routes = express.Router();

const user = new userController;

const employee = new employeeController;

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployee);
routes.post("/employees/create", employee.createEmployee);


export default routes;