import userController from './../controllers/usersController';
import express from "express";

import userOneValidation from '../validations/users/getOne';

import userCreateValidation from '../validations/users/create';
import userUpdateValidation from '../validations/users/update';

const routes = express.Router();

const user = new userController

routes.get("/clients", user.listUsers);
routes.post("/clients", userCreateValidation, user.createUser);
routes.get("/clients/:id", userOneValidation, user.oneUser);
routes.put("/clients/:id", userUpdateValidation, user.updateUser);
routes.delete("/clients/:id", userOneValidation, user.deleteUser);


export default routes;