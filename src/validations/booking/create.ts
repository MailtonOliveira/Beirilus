import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        date: Joi.date().required(),
    }),
});