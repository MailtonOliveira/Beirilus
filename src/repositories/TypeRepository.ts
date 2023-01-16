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
    async uptadeType(id: string,dados:TypeUser): Promise<any>{
        return await prisma.typeUser.update({
            where:{
                id:id,
            },
            data:{
                type:dados.type
            }
        })
    }

    async deleteType(id:string): Promise<any>{
        return await prisma.typeUser.delete({
            where:{
                id
            },
        });
    }
}

export default new TypeUsers();