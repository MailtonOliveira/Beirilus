import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import { Shift } from "@prisma/client";
import shiftService from "../services/ShiftService";


class shiftsController {
  async listShifts(req: Request, res: Response, next: NextFunction) {
    try {
      const listShifts: Array<Shift> = await shiftService.getShifts();
      return res.json({ listShifts });

    } catch (error) {
      next(error);
    }
  };

  async oneShift(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const shiftOne = await shiftService.getShift(id);

        if (!shiftOne) {
            res.status(404).json(ERRORS.USER.BYID)
        };

        return res.status(200).json(shiftOne)

    } catch (error) {
        next(error)
    }

  };

  async createShift(req: Request, res: Response, next: NextFunction) {

    const payload:any = req.body;
    
    const shiftObj: any = {
        weekDay: payload.weekDay,
        start: payload.start,
        end: payload.end
    };
    try {

      const shift = await shiftService.createShift(shiftObj);
      return res.status(201).json(shift);

    } catch (error) {
      next(error);
    }
  };

  async updateShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      const payload: any = req.body;

      const shiftObj: any = {
        weekDay: payload.weekDay,
        start: payload.start,
        end: payload.end
      };

      const shiftUpdate = await shiftService.updateShift(id, shiftObj)
      

      if (!shiftUpdate) {
      return res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(shiftUpdate);

    } catch (error) {}
  };

  async deleteShift(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const shiftDelete = await shiftService.deleteShift(id);

      if (!shiftDelete) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
};

export default shiftsController;
