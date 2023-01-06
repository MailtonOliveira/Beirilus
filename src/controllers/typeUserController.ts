import { Request, Response, NextFunction } from "express";
import prisma from "../database/prismaClient";

class typeController {

  async listTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const listTypes = await prisma.typeUser.findMany();
      res.json({ listTypes });
    } catch (error) {
      next(error);
    }
  }

  async createType(req: Request, res: Response, next: NextFunction) {
    try {
      const { role, type, } = req.body;
      const typeCreate = await prisma.typeUser.create({
        data: {
          role,
          type
        },
      });
      res.status(201).json(typeCreate);
    } catch (error) {
      next(error);
    }
  }
}

export default typeController;
