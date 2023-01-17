import { Services } from "@prisma/client";
import prisma from "../database/prismaClient";

class ServiceRepository {
  async getServices(): Promise<Array<any>> {
    return await prisma.services.findMany();
  }

  async getService(serviceId: string): Promise<any> {
    return await prisma.services.findFirst({
      where: {
        id: serviceId,
      },
    });
  }

  async createService(dados: Services): Promise<any> {
    return await prisma.services.create({
      data: {
        price: dados.price,
        name: dados.name,
        description: dados.description,
        duration: dados.duration
      },
    });

  }

  async updateService(id: string, dados: Services): Promise<any> {
    return await prisma.services.update({
      where: {
        id,
      },
      data: {
        price: dados.price,
        name: dados.name,
        description: dados.description,
        duration: dados.duration   
      },
    })
  }

  async deleteService(id:string):Promise<any> {
    return await prisma.services.delete({
      where: {
        id,
      }

  })
}

}

export default new ServiceRepository();
