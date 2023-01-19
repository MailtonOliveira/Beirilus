import { User } from '@prisma/client';
import UserRepository from '../repositories/UserRepository';
class UserService {

    getUsers(): Promise<Array<User>>{

        return  UserRepository.getUsers()
    }

    getUser(userId?: string, fields?: any, filter?: any): Promise<User>{

        return UserRepository.getUser(userId, fields, filter)
    }

    createUser(dados: User) {

        return UserRepository.createUser(dados)
    }
    updateUser(id: string, dados: User) {

        return UserRepository.updateUser(id, dados)
    }
    deleteUser(id: string){

        return UserRepository.deleteUser(id)
    }

}

export default new UserService();