import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient";
import { Role } from "@prisma/client";



class employeeController {
  async listEmployees(req: Request, res: Response, next: NextFunction)  {
    try {
      const listingEmployees = await prisma.employee.findMany();
      return res.json({ listingEmployees });

    } catch (error) {
      next(error);
    }
  }

  async oneEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const employee = await prisma.employee.findUnique({
        where: {
          id,
        },
      });

      if (!employee) {
        return res.status(404).json(ERRORS.EMPLOYEE.ID);
      }

        return res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;
      const typeUser = await prisma.typeUser.findFirst({
        where: {
          role: Role.EMPLOYEE,
        },
      });

      if (user.create.typeUserId != typeUser?.id) {
        return res.status(404).json(ERRORS.EMPLOYEE.TYPEUSER);
      }
      const employeeCreate = await prisma.employee.create({
        data: {
          user,
        },
      });

      if (!employeeCreate) {
        return res.status(404).json(ERRORS.EMPLOYEE.ID);
      }

        return res.status(200).json(employeeCreate);
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const employeeDelete = await prisma.employee.findFirst({
        where: {
          id,
        },
      });

      if (!employeeDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default employeeController;
