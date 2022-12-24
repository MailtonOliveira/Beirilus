import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().hex().required(),
    }),
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.number(),
        birth: Joi.date(),

    }),
});