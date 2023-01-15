import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import { Booking } from "@prisma/client";
import bookingService from "../services/BookingService";
import prisma from "../database/prismaClient"
import MailService from "../services/MailService";


class bookingController {
  async listBookings(req: Request, res: Response, next: NextFunction) {
    try {

      const bookingsList: Array<Booking> = await bookingService.getBookings();
      return res.json({ bookingsList });

    } catch (error) {
      next(error);
    }
  };

  async oneBooking(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const bookingOne = await bookingService.getBooking(id);

        if (!bookingOne) {
            return res.status(404).json(ERRORS.USER.BYID)
        };

        return res.status(200).json(bookingOne)

    } catch (error) {
        next(error)
    }

  };

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const payload:any = req.body;
      const bookingObj: any = {
        date: payload.date,
        customerId: payload.customerId,
        servicesId: payload.servicesId,
        barberId: payload.barberId 
      }
      
      const bookingCreate = await bookingService.createBooking(bookingObj);
      
      const mailBooking = await prisma.user.findUnique({
        where: {
          id: payload.customerId
        },
      });

      const sendMail = await MailService.SendMail(mailBooking?.email!, "Agendamento realizado com sucesso! <br/><br/> Não esqueça de lavar os cabelos"+bookingCreate, "Beirilus - Agendado com sucesso ")

      if (sendMail?.status == "error") {
        return res.status(400).json(sendMail)

      }

      return res.status(201).json(bookingCreate);

    } catch (error) {
      return next(error);
    }
  };

  async updateBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { date } = req.body;

      const bookingUpdate = await bookingService.updateBooking(id, date);

      if (!bookingUpdate) {
        return res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(bookingUpdate);
    } catch (error) {}
  };

  async deleteBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bookingDelete = await bookingService.deleteBooking(id);

      if (!bookingDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      return res.sendStatus(204);

    } catch (error) {
      next(error);
    }
  };
};

export default bookingController;