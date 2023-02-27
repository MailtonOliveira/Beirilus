import { ERRORS } from "./../constants/errors";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import UserService from "../services/UserService";
import MailService from "../services/MailService";
import { TEXT } from "../constants/text";
import { SUBJECT } from "../constants/subject";

class UserController {
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const listUsers: Array<User> = await UserService.getUsers();
      res.json({ listUsers });
    } catch (error) {
      return next(error);
    }
  }

  async oneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userOne = await UserService.getUser(id);

      if (!userOne) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      res.status(200).json(userOne);
    } catch (error) {
      return next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: User = req.body;

      const userObj: any = {
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        birth: payload.birth,
        passwd: payload.passwd,
        typeUserId: payload.typeUserId,
      };

      const userCreate = await UserService.createUser(userObj);

      const sendMail = await MailService.SendMail(
        userCreate.email,
        TEXT.USER.CREATE + userCreate.name,
        SUBJECT.USER.CREATE
      );

      if (sendMail?.status == "error") {
        return res.status(400).json(sendMail);
      }

      return res.status(201).json(userCreate);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload: User = req.body;

      const userObj: any = {
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        birth: payload.birth,
      };
      const userUpdate = await UserService.updateUser(id, userObj);

      if (!userUpdate) {
        return res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(userUpdate);
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userDelete = await UserService.deleteUser(id);

      if (!userDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
