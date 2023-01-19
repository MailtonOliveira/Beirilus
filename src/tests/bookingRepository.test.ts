import prisma from "../database/prismaClient";
import bookingRepository from "../repositories/BookingRepository";
import TypeServices from "../services/TypeServices";
import UserService from "../services/UserService";

describe("bookingRepository", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("bookingRepository.__createBooking", () => {
    it("deve encontrar um cliente para fazer agendamento", async () => {
      
      const userType = await TypeServices.getTypeUser("customer")
      const getClient = await UserService.getUser("", {id:true}, {typeUserId:userType.id })
      expect(getClient).toBeDefined()
    });
    // it("deve criar um agendamento", async () => {
    //   const mockResponse = {
    //     date: String,
    //     customerId: String,
    //     servicesId: String,
    //     barberId: String,
    //   };

    //   prisma.booking.create = jest.fn().mockResolvedValue(mockResponse);

    //   const result = await bookingRepository.createBooking({
    //     date: "2000-12-12T02:55:22.562Z",
    //     customerId: "63bf4f9b292b0aeaefcdc5c8",
    //     servicesId: "63bf537af5416907b3ada8fb",
    //     barberId: "63bf4f9b292b0aeaefcdc5c9",
    //   });

    //   expect(result).toEqual(mockResponse);
    //   expect(prisma.booking.create).toHaveBeenCalledTimes(1);
    // });
  });
});
