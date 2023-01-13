import bcrypt from "bcrypt";
import { User } from "@prisma/client";
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

  async createUser(dados: User): Promise<any> {
    const newPass = bcrypt.hashSync(dados.passwd, 10)
    const typeUser = prisma.typeUser.findFirst({
        where: {
          type: "customer"
        },
      });
    
    return await prisma.user.create({
      data: {
        email: dados.email,
        name: dados.name,
        phone: dados.phone,
        birth: dados.birth,
        passwd: newPass,
        // typeUserId: typeUser?.id,
      },
    });
  }
}

export default new UserRepository();
