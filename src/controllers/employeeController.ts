
import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient"


class employeeController {

  async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
        const listingEmployees = await prisma.employee.findMany();
        res.json({ listingEmployees });
    } catch (error) {
        next(error);
    }
  };

  async oneEmployee(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id,
            }
        });

        if (!employee) {
            res.status(404).json("id não encontrado")
        };

        res.status(200).json(employee)

    } catch (error) {
        next(error)
    }

  };

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      const employeeCreate = await prisma.employee.create({
        data: {
          userId,
        },
      });
      res.status(201).json(employeeCreate);
    } catch (error) {
      next(error);
    }
  };

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const EmployeeDelete = await prisma.employee.findFirst({
        where: {
          id,
        },
      });

      if (!EmployeeDelete) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.user.delete({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

}

export default employeeController;
