
import prisma from "../database/prismaClient";

class LoginRepository {

    static async getUser(email: string, passwd: string): Promise<any>{
       

        return await prisma.user.findFirst({
            where: {
                email,
            }
        });
    }
}

export default LoginRepository;