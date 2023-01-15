import { User } from '@prisma/client';


import UserRepository from '../repositories/UserRepository';
class UserService {

    getUsers(): Promise<Array<User>>{

        return  UserRepository.getUsers()
    }

    getUser(userId: string): Promise<User>{

        return UserRepository.getUser(userId)
    }

    createUser(dados: User) {

        return UserRepository.createUser(dados)
    }

}

export default new UserService();