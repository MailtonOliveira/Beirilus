import { Employee, User } from "@prisma/client";
import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";


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

  async createEmployee(dados: any): Promise<any> {

    const user = dados;
    const newPass = bcrypt.hashSync(user.create.passwd, 10);
    user.create.passwd = newPass;
    
    const typeUser = await prisma.typeUser.findFirst({
        where: {
          type: "employee"
        },
      });

    user.create.typeUserId = typeUser?.id;
    
    return await prisma.employee.create({
      data:{
        user,
      }
       })
  }
  
  async deleteEmployee(id: string): Promise<any> {
    await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    return await prisma.employee.delete({
      where: {
        id,
      }
    })
  }
}


export default new EmployeeRepository();
