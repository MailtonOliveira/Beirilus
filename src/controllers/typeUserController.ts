import { TypeUser } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient";
import TypeServices from "../services/TypeServices";

class typeController {

  async listTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const listTypes: Array<TypeUser> = await TypeServices.getTypes();
      res.json({ listTypes });
    } catch (error) {
      next(error);
    }
  }

  async createType(req: Request, res: Response, next: NextFunction) {
    try {
      const {type} = req.body;
      const typeCreate = await TypeServices.createType(type);
      return res.status(201).json(typeCreate);
    } catch (error) {
      next(error);
    }
  }

  async uptadeTypeUser(req:Request, res:Response, next: NextFunction){
    try {
        const {id} = req.params;
        const {type} = req.body;

        await prisma.typeUser.update({
          where:{
            id
          },
          data:{
            type
          }
        });
        const uptadeType = await prisma.typeUser.findFirst({
          where:{
            id
          }
        });

        if(!uptadeType){
          return res.status(400).json(ERRORS.TYPE.ID);
        }
        
        return res.status(200).json(uptadeType);
    } catch (error) {
      next(error);
    }
  }

  async oneTyper(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const typeOne = await TypeServices.getType(id);

      if (!typeOne) {
        return res.status(404).json(ERRORS.TYPE.ID);
      }

      return res.status(200).json(typeOne);
    } catch (error) {
      next(error);
    }
  }

  async deleteType(req:Request, res:Response, next:NextFunction){
    try {
      const { id } = req.params;

      const typeDelete = await prisma.typeUser.findFirst({
        where: {
          id,
        },
      });

      if (!typeDelete) {
        return res.status(404).json(ERRORS.TYPE.ID);
      }

      await prisma.typeUser.delete({
        where: {
          id,
        },
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default typeController;
