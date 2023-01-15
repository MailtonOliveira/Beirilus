import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        weekDay: Joi.date().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
    }),
});