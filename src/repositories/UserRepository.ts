import { type } from 'os';
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "../database/prismaClient";
import TypeServices from "../services/TypeServices";

const selectwithoutpassword = {
  id: true,
  email: true,
  name: true,
  phone: true,
  birth: true,
  typeUserId: true,
};

class UserRepository {
  async getUsers(): Promise<Array<any>> {
    return await prisma.user.findMany({
      select: selectwithoutpassword,
    });
  }

  async getUser(id: string): Promise<any> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      select: selectwithoutpassword,
    });
  }

  async createUser(dados: User): Promise<User> {
    const newPass = bcrypt.hashSync(dados.passwd, 10);
    const userType = await TypeServices.getTypeUser("customer")

    return await prisma.user.create({
      data: {
        email: dados.email,
        name: dados.name,
        phone: dados.phone,
        birth: dados.birth,
        passwd: newPass,
        typeUserId: userType.id
      },
    });
    console.log(this.createUser)
  }

  async updateUser(id: string, dados: User): Promise<any> {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dados.email,
        name: dados.name,
        phone: dados.phone,
        birth: dados.birth
      },
    })
  }
  async deleteUser(id: string): Promise<any> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();
