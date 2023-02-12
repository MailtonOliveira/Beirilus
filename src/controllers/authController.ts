import { ERRORS } from './../constants/errors';
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import LoginService from '../services/LoginService';
import jwt from "jsonwebtoken";
import { secret } from "../configs/secret"


class authController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, passwd } = req.body;

      const userOne = await LoginService.getUser(email, passwd);

      if (!userOne || !bcrypt.compareSync(passwd, userOne.passwd)) {
        return res.status(401).json(ERRORS.AUTH.LOGIN);
      }

      const token = jwt.sign({
        id: userOne.id,
        email: userOne.email,
        name: userOne.name,
        userType: 'user'
      },
      secret.key)

      return res.status(200).json(token)
    } catch (error) {
        return next(error);
    }
  }
};

export default authController;
