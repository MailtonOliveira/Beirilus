import { ERRORS } from "./../constants/errors";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../database/prismaClient"

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
      const { email, name, phone, birth, passwd, typeUserId } = req.body;
      const newPass = bcrypt.hashSync(passwd, 10);
      const userCreate = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          birth,
          passwd: newPass,
          typeUserId         
        },
      });
      res.status(201).json(userCreate);
    } catch (error) {
      console.log(error);
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
        res.status(400).json(ERRORS.USER.BYID);
      }

      res.status(200).json(userUpdate);
    } catch (error) {}
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
        res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default userController;
