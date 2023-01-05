import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import prisma from "../database/prismaClient"


class servicesController {
  async listServices(req: Request, res: Response, next: NextFunction) {
    try {
      const listServices = await prisma.services.findMany();
      res.json({ listServices });
    } catch (error) {
      next(error);
    }
  };

  async findByIdServices(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const services = await prisma.services.findUnique({
            where: {
                id,
            }
        });

        if (!services) {
            res.status(404).json(ERRORS.USER.BYID)
        };

        res.status(200).json(services)

    } catch (error) {
        next(error)
    }

  };

  async createServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { price, name, description, duration } = req.body;
      const createServices = await prisma.services.create({
        data: {
          price,
          name,
          description,
          duration
        },
      });
      res.status(201).json(createServices);
    } catch (error) {
      next(error);
    }
  };

  async updateServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { price, name, description, duration } = req.body;

      await prisma.services.update({
        where: {
          id,
        },
        data: {
            price,
            name,
            description,
            duration  
        },
      });
      const servicesUpdate = await prisma.services.findFirst({
        where: {
          id,
        },
      });

      if (!servicesUpdate) {
        res.status(400).json(ERRORS.USER.BYID);
      }

      res.status(200).json(servicesUpdate);
    } catch (error) {}
  };

  async deleteServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const servicesDelete = await prisma.services.findFirst({
        where: {
          id,
        },
      });

      if (!servicesDelete) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      await prisma.services.delete({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
};

export default servicesController;
