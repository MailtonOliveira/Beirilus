import typeController from './../controllers/typeUserController';
import userController from './../controllers/usersController';
import employeeController from '../controllers/employeeController';
import bookingController from '../controllers/bookingController';


import express from "express";

import userOneValidation from '../validations/users/getOne';
import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

import employeeCreateValidation from '../validations/employees/create';
import employeeOneValidation from '../validations/employees/getOne';

import bookingCreateValidation from '../validations/booking/create';
import bookingOneValidation from '../validations/booking/getOne';
import bookingUpdateValidation from '../validations/booking/update';


const routes = express.Router();

const user = new userController;

const employee = new employeeController;
const typeUser = new typeController;
const booking = new bookingController;

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployees);
routes.post("/employees", employeeCreateValidation, employee.createEmployee);
routes.get("/employees/:id", employeeOneValidation, employee.oneEmployee );

routes.post("/typeUser", typeUser.createType);
routes.get("/typeUser", typeUser.listTypes);

routes.get("/booking", booking.listBooking);
routes.post("/booking", bookingCreateValidation, booking.createBooking);
routes.get("/booking/:id", bookingOneValidation, booking.findByIdBooking);
routes.put("/booking/:id", bookingUpdateValidation, booking.updateBooking);
routes.delete("/booking/:id", booking.deleteBooking);

export default routes;