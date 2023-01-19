import { Booking } from '@prisma/client';


import BookingRepository from '../repositories/BookingRepository';
class BookingService {

    getBookings(): Promise<Array<Booking>>{

        return  BookingRepository.getBookings()
    }

    getBooking(id: string): Promise<Booking>{

        return BookingRepository.getBooking(id)
    }

    createBooking(dados: Booking) {

        return BookingRepository.createBooking(dados)
    }


    deleteBooking(id: string){

        return BookingRepository.deleteBooking(id)
    }

}

export default new BookingService();