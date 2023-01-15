import { Shift } from "@prisma/client";
import prisma from "../database/prismaClient";

class ShiftRepository {
  async getShifts(): Promise<Array<any>> {
    return await prisma.shift.findMany();
  }

  async getShift(shiftId: string): Promise<any> {
    return await prisma.shift.findFirst({
      where: {
        id: shiftId,
      },
    });
  }

  async createShift(dados: Shift): Promise<any> {
    return await prisma.shift.create({
      data: {
        weekDay: dados.weekDay,
        start: dados.start,
        end: dados.end,
      },
    });

  }

  async updateShift(id: string, dados: Shift): Promise<any> {
    return await prisma.shift.update({
      where: {
        id,
      },
      data: {
        weekDay: dados.weekDay,
        start: dados.start, 
        end: dados.end,    
      },
    })
  }

  async deleteShift(id:string):Promise<any> {
    return await prisma.shift.delete({
      where: {
        id,
      }

  })
}

}

export default new ShiftRepository();
