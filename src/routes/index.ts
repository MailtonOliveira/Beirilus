import userController from './../controllers/userController';
import express, { Router } from "express";

const routes = express.Router();

const user = new userController

routes.post("/client", user.createUser);

export default routes;