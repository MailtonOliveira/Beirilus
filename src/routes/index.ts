import typeController from './../controllers/typeUserController';
import userController from './../controllers/usersController';
import employeeController from '../controllers/employeeController';
import servicesController from '../controllers/servicesController';

import express from "express";

import userOneValidation from '../validations/users/getOne';
import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

import employeeCreateValidation from '../validations/employees/create';
import employeeOneValidation from '../validations/employees/getOne';

import servicesCreateValidation from '../validations/services/create';
import servicesOneValidation from '../validations/services/getOne';
import servicesUpdateValidation from '../validations/services/update';



const routes = express.Router();

const user = new userController;

const employee = new employeeController;
const typeUser = new typeController;
const services = new servicesController;

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployees);
routes.post("/employees", employeeCreateValidation, employee.createEmployee);
routes.get("employees/:id", employeeOneValidation, employee.oneEmployee );

routes.post("/typeUser", typeUser.createType);
routes.get("/typeUser", typeUser.listTypes);

routes.get("/services", services.listServices);
routes.post("/services", servicesCreateValidation, services.createServices);
routes.get("/services/:id", servicesOneValidation, services.findByIdServices);
routes.post("/services/:id", servicesUpdateValidation, services.updateServices);
routes.delete("/services/:id", services.deleteServices);



export default routes;