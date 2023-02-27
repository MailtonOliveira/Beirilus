import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import EmployeeService from "../services/EmployeeService";
import UserService from "../services/UserService";

class EmployeeController {
  async listEmployees(req: Request, res: Response, next: NextFunction) {
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

      // payload.create.typeUserId = typeUser?.id
      // payload.create.type = "employee"

      const employeeCreate = await EmployeeService.createEmployee(user);

      if (!employeeCreate) {
        return res.status(404).json(ERRORS.EMPLOYEE.ID);
      }

      return res.status(200).json(employeeCreate);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const employee = await EmployeeService.getEmployee(id);
      const userId = employee.userId;

      const employeeDelete = await EmployeeService.deleteEmployee(id);
      await UserService.deleteUser(userId);

      if (!employeeDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      if (!employeeDelete) {
        return res.status(404).json(ERRORS.USER.BYID);
      }

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }
}

export default EmployeeController;
