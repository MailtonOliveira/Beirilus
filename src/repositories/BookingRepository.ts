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
    const endDate = startDate.add(getService.duration.toString(), "hours");
    
    const checkAvailability = await this.checkBookingAvailability(dados.barberId, startDate.format("YYYY-MM-DD HH:mm:ss"), endDate.format("YYYY-MM-DD HH:mm:ss"))
    //a função checkbookingavailability vai retornar true caso o horário esteja disponível!

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
      //retornar que o horário pretendido não está disponível
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
    //Usei o format do moment para definir o formato da data que precisamos.
    //Da mesma forma, definimos que queremos a data atual (quando chama o moment sem passar nada ele é como se fosse o new Date()), porém
    //setamos que a hora minuto e segundo são 00:00:00.

    const bookings = await prisma.booking.findMany({
      where: {
        barberId,
        startDate: {
          gte: today,  // maior ou igual
          //aqui estamos procurando por todos os agendamentos que tenham sido feitos pra data atual em diante para o barberId informado!
        }
      }
    });

    for (var i = 0; i < bookings.length; i++) {
      //vamos percorrer todos os agendamentos do barber informado
      //o teste é: se a data de inicio do agendamento no loop atual for menor que a data de término do horário pretendido
      // && se a data de término do agendamento no loop atual for maior que a data de inicio do horário pretendido
      // significa que o horário não está disponível!
      if (bookings[i].startDate < endDate && bookings[i].endDate > startDate) {

        // Exemplo: considere o seguinte registro existente no banco:
        /*
          bookings[i]
          {
            startDate: "2023-18-01 17:00:00",
            endDate: "2023-18-01 18:00:00",
            barberId: 1
          }          
        */

       // considere que o usuário passou o seguinte payload de agendamento:
       /*
       payload
        {
          startDate: "2023-18-01 18:00:00",
          endDate: "2023-18-01 19:00:00",
          barberId: 1
        }
       */

        // quando chegar neste if, a checagem "2023-18-01 17:00:00" <= "2023-18-01 19:00:00" && "2023-18-01 18:00:00" >= "2023-18-01 18:00:00"
        // vai retornar true!
        // porque: a startDate do registro atual do loop (2023-18-01 17:00:00) é menor que a endDate da intenção de agendamento (2023-18-01 19:00:00)
        // ou seja .. a duração da intenção de agendamento está colidindo com o inicio do agendamento que existe no banco

        // a endDate do registro atual do loop (2023-18-01 19:00:00) é igual ou maior que a startDate do agendamento (2023-18-01 18:00:00)
        // ou seja .. o inicio da intenção de agendamento está colidindo com o término do agendamento que existe no banco

        //Se as duas condições forem verdadeiras, retornamos false, ou seja: não pode liberar o agendamento!

        return false;
      }
    }

    // se não colidir com nenhum horário: retorna true e vamo pro agendamento/consulta de disponibilidade de horário!
    return true;
    
  }

  async listAvailableBookings(barberId: string, serviceId: string): Promise<any> {
    //função para listar os horários disponíveis baseado no barberId informado e o serviceId informado.
    // Espera-se que para consumir este endpoint o usuário já tenha selecionado o profissional e o tipo de serviço que quer realizar.
    
    const serviceDuration = await ServicesService.getService(serviceId)

    
    // vou assumir que o horário de funcionamento é de 8 as 18 .. mas vcs provavelmente terão que colocar essa informação em alguma tabela e recuperar
    // essa informação aqui neste trecho de código. Esta listagem de horários disponíveis só leva em consideração o dia atual (MVP)
    const dayStart = moment().hour(8).minute(0).second(0).tz("America/Sao_Paulo");
    const dayEnd = moment().hour(18).minute(0).second(0).tz("America/Sao_Paulo");
    //na variável dayStart estamos pegando a data atual porém definindo a hora para 08:00:00 no horário de brasília
    //na variável dayEnd estamos pegando a data atual porém definindo a hora para 18:00:00 no horário de brasília
    let availableBookings = [];
    //variável para armazenar os horários disponíveis

    while (dayStart.isSameOrBefore(dayEnd)) {
      const endDate = dayStart.add(serviceDuration.duration.toString(), "hours");
      //vamos percorrer as horas de 1 em 1, iniciando das 8 da manhã até as 18. Enquanto dayStart for igual ou menor ao dayEnd, esse loop vai rodar
      const checkAvailability = await this.checkBookingAvailability(barberId, dayStart.format("YYYY-MM-DD HH:mm:ss"), endDate.format("YYYY-MM-DD HH:mm:ss"));
      // chamamos nossa função checkAvailability passando o barberId, a hora atual do loop e como data de término passamos o final do dia.
      if (checkAvailability) {
        //se a função retornar true, adicionamos no array availableBookings a data de início disponível para o usuário.
        availableBookings.push({
          availableStartDate: dayStart.format("YYYY-MM-DD HH:mm:ss")
        })
      }
      dayStart.add(1, 'hour');
      //acrescentamos + 1 hora no horário do dayStart para que a gente não entre em um loop infinito
    }

    //Aqui vamos retornar um array com todos os horários disponíveis naquele barber para aquele serviço específico
    return availableBookings;

  }

}

export default new BookingRepository();