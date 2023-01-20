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
    const endDate = moment(dados.endDate).tz("America/Sao_Paulo");
    
    const getService = await ServicesService.getService(dados.servicesId);
    
    // const endDate = startDate.add(getService.duration.toString(), "hours");
    
    const checkAvailability = await this.checkBookingAvailability(dados.barberId, startDate.format("YYYY-MM-DD HH:mm:ss"), endDate.format("YYYY-MM-DD HH:mm:ss"))
   

    if (checkAvailability) {

      return await prisma.booking.create({
        data: {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          customerId: dados.customerId,
          servicesId: dados.servicesId,
          barberId: dados.barberId
        },
      });

    } else {

    }
  }


  async deleteBooking(id: string): Promise<any> {
    return await prisma.booking.delete({
      where: {
        id,
      }

    })
  }

  async checkBookingAvailability(barberId: string, startDate: string, endDate: string): Promise<boolean> {
    const today = moment().hour(0).minute(0).second(0).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss");


    const bookings = await prisma.booking.findMany({
      where: {
        barberId,
        startDate: {
          gte: today,
        }
      }
    });

    for (var i = 0; i < bookings.length; i++) {
    
      if (bookings[i].startDate < endDate && bookings[i].endDate > startDate) {



        return false;
      }
    }

    return true;
    
  }

  async listAvailableBookings(barberId: string, serviceId: string): Promise<any> {
    
    const serviceDuration = await ServicesService.getService(serviceId)

    

    const dayStart = moment().hour(9).minute(0).second(0).tz("America/Sao_Paulo");
    const dayEnd = moment().hour(18).minute(0).second(0).tz("America/Sao_Paulo");
    

    let availableBookings = [];


    while (dayStart.isSameOrBefore(dayEnd)) {
      
      const endDate = dayStart.add(serviceDuration.duration.toString(), "hours");

      const checkAvailability = await this.checkBookingAvailability(barberId, dayStart.format("YYYY-MM-DD HH:mm:ss"), endDate.format("YYYY-MM-DD HH:mm:ss"));
   
      if (checkAvailability) {

        availableBookings.push({
          availableStartDate: dayStart.format("YYYY-MM-DD HH:mm:ss")
        })
      }
      dayStart.add(1, 'hour');
      

    }
    


    return availableBookings;
    

  } 

}

export default new BookingRepository();