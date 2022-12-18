import { ERRORS } from './../constants/errors';
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class userController {
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const listUsers = await prisma.user.findMany();
      res.json({ listUsers });
    } catch (error) {
      next(error);
    }
  }

  async oneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userOne = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userOne) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      res.status(200).json(userOne);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, phone, birth, passwd } = req.body;
      const newPass = bcrypt.hashSync(passwd, 10);
      const userCreate = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          birth,
          passwd: newPass,
        },
      });
      res.status(201).json(userCreate);
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
        res.status(400).json(ERRORS.USER.BYID)
      };

      res.status(200).json(userUpdate)
    } catch (error) {}
  }
}

export default userController;
