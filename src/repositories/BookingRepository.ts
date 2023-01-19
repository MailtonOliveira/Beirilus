import { Booking } from "@prisma/client";
import prisma from "../database/prismaClient";
import moment from "moment-timezone";
import ServicesService from "../services/ServicesService";

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

  async createBooking(dados: any): Promise<any> {

    const startDate = moment(dados.startDate).tz("America/Sao_Paulo");
    const getService = await ServicesService.getService(dados.servicesId);
    const endDate = startDate.add(getService.duration, "hours");
    const endDateString = endDate.toString();
    
    

    return await prisma.booking.create({
      data: {
          startDate: dados.start,
          endDate: endDateString,
          customerId: dados.customerId,
          servicesId: dados.servicesId,
          barberId: dados.barberId
      },
    });
    if(dados.startDate >= ){
      
    }
    const checkAvailability = await prisma.booking.findFirst({
      where: {
       barberId: dados.barberId,
       startDate: // aqui vc precisa testar se a data da intenção de agendamento colide com as datas já agendadas para este barber. Pra isso vamos usar o "less than equal", que significa 'menor ou igual a' e o "greater than equal", que é o 'maior ou igual a'.
       {
        gte {
         new Date(dados.startDate) //a data de inicio é maior ou igual a data de inicio desejada
        },
        lte {
         new Date(endDate) //a data de término é menor ou igual a data de finalização prevista
        }
    }

  }
});

  async deleteBooking(id:string):Promise<any> {
    return await prisma.booking.delete({
      where: {
        id,
      }

  })
}

}

export default new BookingRepository();
