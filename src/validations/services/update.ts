import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().hex().required(),
    }),
    body: Joi.object({
        price:       Joi.string().required(),
        name:       Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.date().required(),

    }),
});