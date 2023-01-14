import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient"


class shiftsController {
  async listShifts(req: Request, res: Response, next: NextFunction) {
    try {
      const listShifts = await prisma.shift.findMany();
      return res.json({ listShifts });
    } catch (error) {
      next(error);
    }
  };

  async findByIdShift(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const shift = await prisma.shift.findUnique({
            where: {
                id,
            }
        });

        if (!shift) {
          return res.status(404).json(ERRORS.USER.BYID)
        };

        return res.status(200).json(shift)

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
      return res.status(201).json(createShift);
    } catch (error) {
      next(error);
    }
  };

  async updateShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { weekDay, start, end } = req.body;

      await prisma.shift.update({
        where: {
          id,
        },
        data: {
          weekDay,
          start, 
          end,    
        },
      });
      const shiftUpdate = await prisma.shift.findFirst({
        where: {
          id,
        },
      });

      if (!shiftUpdate) {
        return res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(shiftUpdate);
    } catch (error) {}
  };

  async deleteShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const shiftDelete = await prisma.shift.findFirst({
        where: {
          id,
        },
      });

      if (!shiftDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.shift.delete({
        where: {
          id,
        },
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
};

export default shiftsController;
