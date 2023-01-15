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

  async getUser(userId: string): Promise<any> {
    return await prisma.user.findFirst({
      where: {
        id: userId,
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
        typeUserId: userType.id,
      },
    });
    console.log(this.createUser)
  }
}

export default new UserRepository();
