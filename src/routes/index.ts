import typeController from './../controllers/typeUserController';
import userController from './../controllers/usersController';
import employeeController from '../controllers/employeeController';


import express from "express";

import userOneValidation from '../validations/users/getOne';
import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

import employeeCreateValidation from '../validations/employees/create';
import employeeOneValidation from '../validations/employees/getOne';


import typeUserValidatioin from '../validations/typeUser/create';


const routes = express.Router();

const user = new userController;

const employee = new employeeController;
const typeUser = new typeController;

routes.get("/clients", user.listUsers);
routes.post("/clients", user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployees);
routes.post("/employees", employeeCreateValidation, employee.createEmployee);
routes.get("/employees/:id", employeeOneValidation, employee.oneEmployee );

routes.post("/typeUser",typeUserValidatioin, typeUser.createType);
routes.get("/typeUser", typeUser.listTypes);
routes.put("/typeUser/:id",typeUserValidatioin,typeUser.uptadeTypeUser);
routes.delete("/typeUser/:id",typeUser.deleteType);


export default routes;