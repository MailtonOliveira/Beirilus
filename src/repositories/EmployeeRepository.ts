
import { Employee } from "@prisma/client";
import prisma from "../database/prismaClient";

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

  async createEmployee(dados: Employee): Promise<any> {
    const newPass = bcrypt.hashSync(dados.passwd, 10);
    const typeUser = prisma.typeUser.findFirst({
        where: {
          type: "employee"
        },
      });
    
    return await prisma.employee.create({
      data: {
        user
      },
    });
  }
}

export default new UserRepository();
