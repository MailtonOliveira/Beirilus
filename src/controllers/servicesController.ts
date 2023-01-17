import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../constants/errors";
import { Services } from "@prisma/client";
import servicesService from "../services/ServicesService";

class servicesController {
  async listServices(req: Request, res: Response, next: NextFunction) {
    try {
      const listServices: Array<Services> = await servicesService.getServices();
      return res.json({ listServices });
    } catch (error) {
      next(error);
    }
  };

  async findByIdServices(req: Request, res: Response, next: NextFunction) {
    try {

        const { id } = req.params;

        const services = await servicesService.getService(id);

        if (!services) {
            res.status(404).json(ERRORS.USER.BYID)
        };

        return res.status(200).json(services);

    } catch (error) {
        next(error)
    }

  };

  async createServices(req: Request, res: Response, next: NextFunction) {
    
    const payload: any = req.body;
      const serviceObj: any = {
        price: payload.price,
        name: payload.name,
        description: payload.description,
        duration: payload.duration
      }

    try {

      const createServices = await servicesService.createService(serviceObj);
      return res.status(201).json(createServices);

    } catch (error) {
      next(error);
    }
  };

  async updateServices(req: Request, res: Response, next: NextFunction) {

    const payload: any = req.body;
      const serviceObj: any = {
        price: payload.price,
        name: payload.name,
        description: payload.description,
        duration: payload.duration
      }

    try {
      const { id } = req.params;
      

      const servicesUpdate = await servicesService.updateService(id, serviceObj);
        

      if (!servicesUpdate) {
        res.status(400).json(ERRORS.USER.BYID);
      }

      return res.status(200).json(servicesUpdate);

    } catch (error) {
      next(error);
    }
  };

  async deleteServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const servicesDelete = await servicesService.deleteService(id);

      if (!servicesDelete) {
        res.status(404).json(ERRORS.USER.BYID);
      }

      return res.sendStatus(204);

    } catch (error) {
      next(error);
    }
  };
};

export default servicesController;
