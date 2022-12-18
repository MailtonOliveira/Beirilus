import userController from './../controllers/usersController';
import express from "express";

import getOne from '../validations/users/getOne';

import create from '../validations/users/create';
import update from '../validations/users/update';

const routes = express.Router();

const user = new userController

routes.get("/clients", user.listUsers);
routes.get("/clients/:id", getOne, user.oneUser);
routes.post("/client/create", create, user.createUser);
routes.put("/client/:id", update, user.updateUser);


export default routes;