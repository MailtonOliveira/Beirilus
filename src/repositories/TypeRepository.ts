import { TypeUser } from "@prisma/client";
import { stringify } from "querystring";
import prisma  from "../database/prismaClient";

class TypeUsers {
    async getTypes(): Promise<any>{

        return await prisma.typeUser.findMany({
           
        });
    }

    async getType(typeId:string): Promise<any> {
        return await prisma.typeUser.findFirst({
            where :{
                id: typeId,
            },
            
        });
    }

    async getTypeUser(type: string): Promise<any> {
        return await prisma.typeUser.findFirst({
            where :{
                type,
            },
          
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