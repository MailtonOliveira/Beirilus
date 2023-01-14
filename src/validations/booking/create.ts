import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        date: Joi.date().required(),
        customerId: Joi.string().hex().required(),
        servicesId: Joi.string().hex().required(),
        baberId: Joi.string().hex().required()
    }),
});