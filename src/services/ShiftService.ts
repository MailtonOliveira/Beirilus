import { Shift } from '@prisma/client';


import ShiftRepository from '../repositories/ShiftRepository';
class ShiftService {

    getShifts(): Promise<Array<Shift>>{

        return  ShiftRepository.getShifts()
    }

    getShift(shiftId: string): Promise<Shift>{

        return ShiftRepository.getShift(shiftId)
    }

    createShift(dados: Shift) {

        return ShiftRepository.createShift(dados)
    }

    updateShift(id: string, dados: Shift) {

        return ShiftRepository.updateShift(id, dados)
    }

    deleteShift(id: string){

        return ShiftRepository.deleteShift(id)
    }

}

export default new ShiftService();