import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().hex().required(),
    }),
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        birth: Joi.date().required(),
    }),
});