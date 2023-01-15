import { ERRORS } from "./../constants/errors";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../database/prismaClient"
import { User } from "@prisma/client";
import userService from "../services/UserService";
import MailService from "../services/MailService";
import { TEXT } from "../constants/text";
import { SUBJECT } from "../constants/subject";

class userController {
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const listUsers: Array<User> = await userService.getUsers();
      res.json({ listUsers });
    } catch (error) {
      return next(error);
    }
  }

  async oneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userOne = await userService.getUser(id);

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
      const { email, name, phone, birth, passwd, } = req.body;
      const newPass = bcrypt.hashSync(passwd, 10);
      const typeUser = await prisma.typeUser.findFirst({
        where: {
          type: "customer"
        },
      });
      const userCreate = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          birth,
          passwd: newPass,
          typeUserId: typeUser?.id        
        },
      });
      
      const sendMail = await MailService.SendMail(userCreate.email,  TEXT.USER.CREATE+userCreate.name, SUBJECT.USER.CREATE)

      if (sendMail?.status == "error") {
        return res.status(400).json(sendMail)

      }
      

      return res.status(201).json(userCreate);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { email, name, phone, birth } = req.body;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          name,
          phone,
          birth,
        },
      });
      const userUpdate = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userUpdate) {
        return res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(userUpdate);
    } catch (error) {
      next(error)
    }
  }
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userDelete = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

 
}

export default userController;
