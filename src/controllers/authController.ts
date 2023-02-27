import { ERRORS } from "./../constants/errors";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import LoginService from "../services/LoginService";
import jwt from "jsonwebtoken";
import { secret } from "../configs/secret";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, passwd } = req.body;

      const user = await LoginService.getUser(email, passwd);

      if (!user || !bcrypt.compareSync(passwd, user.passwd)) {
        return res.status(401).json(ERRORS.AUTH.LOGIN);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, userType: "user" },
        secret.key
      );

      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;
