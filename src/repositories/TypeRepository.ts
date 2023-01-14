import { TypeUser } from "@prisma/client";
import prisma  from "../database/prismaClient";;

const selectwithoutpassword = {
    type: true
};

class TypeUsers {
    async getTypes(): Promise<any>{

        return await prisma.typeUser.findMany({
            select: selectwithoutpassword,
        });
    }

    async getType(id:string): Promise<any> {
        return await prisma.typeUser.findFirst({
            where :{
                id:id,
            },
            select: selectwithoutpassword,
        });
    }
    async createType(dados:string): Promise<any>{
        return await prisma.typeUser.create({
            data:{
                type:dados,
            }
        });
    }
}

export default new TypeUsers();