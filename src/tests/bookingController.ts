import bookingController from "../controllers/bookingController";
import prisma from "../database/prismaClient";
import { Request } from "express";


const booking = new bookingController;


describe('bookingController', () => {
    
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('bookingController.__createBooking', () => {
        it('deve criar um agendamento', async () => {
            const bookingId = 1;
            const bookingReq = { body:{ id:'1'} }

            const mockResponse = {
                date: Date,
                customerId: String,
                servicesId: String,
                baberId: String

            }

            prisma.booking.create = jest.fn().mockResolvedValue(mockResponse);

            const result =  await booking.createBooking(bookingReq, {}, {});

            
            expect(result).toEqual(mockResponse);
            expect(prisma.booking.create).toHaveBeenCalledTimes(1);
            });
        });
    });

    