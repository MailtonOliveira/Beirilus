import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        customerId: Joi.string().hex().required(),
        servicesId: Joi.string().hex().required(),
        barberId: Joi.string().hex().required()
    }),
});