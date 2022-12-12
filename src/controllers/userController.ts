import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

class userController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, phone, birth } = req.body;
      const userCreate = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          birth,
        },
      });
      res.status(201).json(userCreate);
    } catch (error) {
      next(error);
    }
  }
}

export default userController;
