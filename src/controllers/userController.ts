import { prisma } from "../database/prismaClient";
import { Request, Response, NextFunction } from "express";

class userController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, phone, birth } = req.body;
      const userCreate = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          birth
        },
      });
      res.status(201).json(userCreate)
    } catch (error) {
      next(error);
    }
  }
};

export default userController
