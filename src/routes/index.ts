import userController from './../controllers/userController';
import express from "express";
import employeeController from '../controllers/employeeController';

const routes = express.Router();

const user = new userController;

const employee = new employeeController;

routes.get("/clients", user.listUsers);
routes.post("/client/create", user.createUser);

routes.get("/employees", employee.listEmployee);
routes.post("/employees/create", employee.createEmployee);


export default routes;