import { Services } from '@prisma/client';


import ServiceRepository from '../repositories/ServiceRepository';
class ServicesService {

    getServices(): Promise<Array<Services>>{

        return  ServiceRepository.getServices()
    }

    getService(serviceId: string): Promise<Services>{

        return ServiceRepository.getService(serviceId)
    }

    createService(dados: Services) {

        return ServiceRepository.createService(dados)
    }

    updateService(id: string, dados: Services) {

        return ServiceRepository.updateService(id, dados)
    }

    deleteService(id: string){

        return ServiceRepository.deleteService(id)
    }

}

export default new ServicesService();