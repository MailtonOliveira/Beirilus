import { Booking } from "@prisma/client";
import prisma from "../database/prismaClient";

class BookingRepository {
  async getBookings(): Promise<Array<any>> {
    return await prisma.booking.findMany();
  }

  async getBooking(id: string): Promise<any> {
    return await prisma.booking.findFirst({
      where: {
        id,
      },
    });
  }

  async createBooking(dados: Booking): Promise<any> {
    return await prisma.booking.create({
      data: {
          date: dados.date,
          customerId: dados.customerId,
          servicesId: dados.servicesId,
          barberId: dados.barberId
      },
    });

  }

  async updateBooking(id: string, dados: Booking): Promise<any> {
    return await prisma.booking.update({
      where: {
        id,
      },
      data: {
          date: dados.date,       // confirmar com o grupo se apenas esse campo será disponibilizado para update   
      },
    })
  }

  async deleteBooking(id:string):Promise<any> {
    return await prisma.booking.delete({
      where: {
        id,
      }

  })
}

}

export default new BookingRepository();
