import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient"


class bookingController {
  async listBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const listBooking = await prisma.booking.findMany();
      res.json({ listBooking });
    } catch (error) {
      next(error);
    }
  };

  async findByIdBooking(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const booking = await prisma.booking.findUnique({
            where: {
                id,
            }
        });

        if (!booking) {
            res.status(404).json(ERRORS.USER.BYID)
        };

        res.status(200).json(booking)

    } catch (error) {
        next(error)
    }

  };

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, customerId, servicesId, baberId } = req.body;
      const createBooking = await prisma.booking.create({
        data: {
          date,
          customerId,
          servicesId,
          baberId

        },
      });
      res.status(201).json(createBooking);
    } catch (error) {
      next(error);
    }
  };

  async updateBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { date } = req.body;

      await prisma.booking.update({
        where: {
          id,
        },
        data: {
            date
        },
      });
      const bookingUpdate = await prisma.booking.findFirst({
        where: {
          id,
        },
      });

      if (!bookingUpdate) {
        res.status(400).json(ERRORS.USER.BYID);
      }

      res.status(200).json(bookingUpdate);
    } catch (error) {}
  };

  async deleteBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bookingDelete = await prisma.booking.findFirst({
        where: {
          id,
        },
      });

      if (!bookingDelete) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.booking.delete({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
};

export default bookingController;