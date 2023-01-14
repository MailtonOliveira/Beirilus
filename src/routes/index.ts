import typeController from './../controllers/typeUserController';
import userController from './../controllers/usersController';
import employeeController from '../controllers/employeeController';
import servicesController from '../controllers/servicesController';
import bookingController from '../controllers/bookingController';
import shiftsController from '../controllers/shiftsController';

import express from "express";

import userOneValidation from '../validations/users/getOne';
import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

import employeeCreateValidation from '../validations/employees/create';
import employeeOneValidation from '../validations/employees/getOne';

import servicesCreateValidation from '../validations/services/create';
import servicesOneValidation from '../validations/services/getOne';
import servicesUpdateValidation from '../validations/services/update';

import bookingCreateValidation from '../validations/booking/create';
import bookingOneValidation from '../validations/booking/getOne';
import bookingUpdateValidation from '../validations/booking/update';

import typeUserValidation from '../validations/typeUser/create';

import shiftsCreateValidation from '../validations/shifts/create';
import shiftsOneValidation from '../validations/shifts/getOne';
import shiftsUpdateValidation from '../validations/shifts/update';

const routes = express.Router();

const user = new userController;

const employee = new employeeController;
const typeUser = new typeController;
const services = new servicesController;
const booking = new bookingController;
const shifts = new shiftsController;

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);

routes.get("/employees", employee.listEmployees);
routes.post("/employees", employeeCreateValidation, employee.createEmployee);
routes.get("/employees/:id", employeeOneValidation, employee.oneEmployee );
routes.delete("/employee/:id", employeeOneValidation, employee.deleteEmployee)

routes.post("/typeUser",typeUserValidation, typeUser.createType);
routes.get("/typeUser", typeUser.listTypes);
routes.put("/typeUser/:id",typeUserValidation,typeUser.uptadeTypeUser);
routes.delete("/typeUser/:id",typeUser.deleteType);
routes.get("typeUser/:id",typeUser.oneTyper);

routes.get("/services", services.listServices);
routes.post("/services", servicesCreateValidation, services.createServices);
routes.get("/services/:id", servicesOneValidation, services.findByIdServices);
routes.put("/services/:id", servicesUpdateValidation, services.updateServices);
routes.delete("/services/:id", services.deleteServices);

routes.get("/booking", booking.listBooking);
routes.post("/booking", bookingCreateValidation, booking.createBooking);
routes.get("/booking/:id", bookingOneValidation, booking.findByIdBooking);
routes.put("/booking/:id", bookingUpdateValidation, booking.updateBooking);
routes.delete("/booking/:id", booking.deleteBooking);

routes.get("/shifts", shifts.listShifts);
routes.post("/shifts", shiftsCreateValidation, shifts.createShift);
routes.get("/shifts/:id",shiftsOneValidation, shifts.findByIdShift);
routes.put("/shifts/:id", shiftsUpdateValidation ,shifts.updateShift);
routes.delete("/shifts/:id", shifts.deleteShift);

export default routes;