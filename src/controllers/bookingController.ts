import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import { Booking } from "@prisma/client";
import bookingService from "../services/BookingService";
import prisma from "../database/prismaClient";
import MailService from "../services/MailService";
import UserService from "../services/UserService";
import ServicesService from "../services/ServicesService";
import { TEXT } from "../constants/text";
import { SUBJECT } from "../constants/subject";
import LinkEmailService from "../services/LinkEmailService";

class bookingController {
  async listBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const bookingsList: Array<Booking> = await bookingService.getBookings();
      return res.json({ bookingsList });
    } catch (error) {
      next(error);
    }
  }

  async oneBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bookingOne = await bookingService.getBooking(id);

      if (!bookingOne) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(bookingOne);
    } catch (error) {
      next(error);
    }
  }

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: any = req.body;
      const bookingObj: any = {
        startDate: payload.startDate,
        endDate: payload.endDate,
        customerId: payload.customerId,
        servicesId: payload.servicesId,
        barberId: payload.barberId,
      };

      // const service = await ServicesService.getService(payload.servicesId);
      // const endDate = service.duration + bookingObj.startDate;

      const bookingCreate = await bookingService.createBooking(bookingObj);

      const mailBookingUser = await UserService.getUser(payload.customerId);

      const mailBookingEmployee = await UserService.getUser(payload.barberId);

      const linkEmail = LinkEmailService.gerarLink(payload.startDate);

      const sendMailUser = await MailService.SendMail(
        mailBookingUser?.email!,
        TEXT.BOOKING_CUSTOMER.CREATE + bookingCreate,
        SUBJECT.BOOKING_CUSTOMER.CREATE
      );
      const sendMailEmployee = await MailService.SendMail(
        mailBookingEmployee?.email!,
        TEXT.BOOKING_EMPLOYEE.CREATE + bookingCreate,
        SUBJECT.BOOKING_EMPLOYEE.CREATE
      );

      if (sendMailUser?.status == "error") {
        return res.status(400).json(sendMailUser);
      }

      if (sendMailEmployee?.status == "error") {
        return res.status(400).json(sendMailEmployee);
      }

      return res.status(201).json({bookingCreate,linkEmail});
    } catch (error) {
      return next(error);
    }
  }

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
  }
}

export default bookingController;
