import { User } from '@prisma/client';
import LoginRepository from '../repositories/LoginRepository'


class LoginService {

    getUser(email: string, passwd: string): Promise<User>{

    return LoginRepository.getUser(email, passwd)
}
}

export default new LoginService();

