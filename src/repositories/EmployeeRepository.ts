import { Employee, User } from "@prisma/client";
import userController from "../controllers/usersController";
import prisma from "../database/prismaClient";
import UserService from "../services/UserService";


const selectwithoutpassword = {
  id: true,
  email: true,
  name: true,
  phone: true,
  birth: true,
  role: true,
  typeUserId: true,
};

class EmployeeRepository {

  async getEmployees(): Promise<Array<any>> {
    return await prisma.employee.findMany();
  }

  async getEmployee(employeeId: string): Promise<any> {
    return await prisma.employee.findFirst({
      where: {
        id: employeeId,
      },
    });
  }

  async createEmployee(dados: Employee ): Promise<any> {

    const typeUser = prisma.typeUser.findFirst({
        where: {
          type: "employee"
        },
      });

    return await prisma.employee.create({
      data: {
       userId: dados.userId
    }
  });
  }
}

export default new EmployeeRepository();
