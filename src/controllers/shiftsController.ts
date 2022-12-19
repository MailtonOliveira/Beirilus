import { Request, Response, NextFunction } from "express";
import prisma from "../database/prismaClient"


class shiftsController {
  async listShifts(req: Request, res: Response, next: NextFunction) {
    try {
      const listShifts = await prisma.shift.findMany();
      res.json({ listShifts });
    } catch (error) {
      next(error);
    }
  };

  async findByIdShifts(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const shift = await prisma.shift.findUnique({
            where: {
                id,
            }
        });

        if (!shift) {
            res.status(404).json("id não encontrado")
        };

        res.status(200).json(shift)

    } catch (error) {
        next(error)
    }

  };

  async createShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { weekDay, start, end } = req.body;
      const createShift = await prisma.shift.create({
        data: {
          weekDay,
          start,
          end
        },
      });
      res.status(201).json(createShift);
    } catch (error) {
      next(error);
    }
  };
};

export default shiftsController;
