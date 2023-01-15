import { validate, Joi } from "express-validation";

export default validate({
    params: Joi.object({
        id: Joi.string().hex().required(),
    }),
    body: Joi.object({
        weekDay: Joi.date().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
    }),
});