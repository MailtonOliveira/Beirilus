import userController from './../controllers/userController';
import express from "express";

const routes = express.Router();

const user = new userController

routes.get("/clients", user.listUsers);
routes.post("/client/create", user.createUser);


export default routes;