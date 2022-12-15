import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

class userController {
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const listingUsers = await prisma.user.findMany();
      res.json({ listingUsers });
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
          passwd: newPass
        },
      });
      res.status(201).json(userCreate);
    } catch (error) {
      next(error);
    }
  }
}

export default userController;
