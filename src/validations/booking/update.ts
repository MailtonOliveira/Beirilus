import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().hex().required(),
    }),
    body: Joi.object({
        date: Joi.date(),
    }),
});