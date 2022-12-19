import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        userId: Joi.string().required(),
    }),
});