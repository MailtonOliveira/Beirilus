import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient";

class employeeController {
  async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const listingEmployees = await prisma.employee.findMany();
      res.json({ listingEmployees });
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
        res.status(404).json("id não encontrado");
      }

      res.status(200).json(employee);
    } catch (error) {
      next(error);
    }
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, typeUserId } = req.body;
      const employeeCreate = await prisma.employee.create({
        data: {
          userId,
          typeUserId
        },
      });

      if (!employeeCreate) {
        res.status(404).json("id não encontrado");
      }

      res.status(200).json(employeeCreate);
    } catch (error) {
      next(error);
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      await prisma.employee.update({
        where: {
          id,
        },
        data: {
          userId,
        },
      });
      const employeeUpdate = await prisma.employee.findFirst({
        where: {
          id,
        },
      });

      if (!employeeUpdate) {
        res.status(400).json(ERRORS.USER.BYID);
      }

      res.status(200).json(employeeUpdate);
    } catch (error) {}
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
  }
}

// async createEmployee(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, name, phone, birth, passwd, employee, typeUser } = req.body;
//     const newPass = bcrypt.hashSync(passwd, 10);
//     const employeeCreate = await prisma.user.create({
//       data: {
//         email,
//         name,
//         phone,
//         birth,
//         passwd: newPass,
//         employee,
//         typeUser
//       }
//     });
//     res.status(201).json(employeeCreate);
//   } catch (error) {
//     console.log(error);
//   }
// }


export default employeeController;