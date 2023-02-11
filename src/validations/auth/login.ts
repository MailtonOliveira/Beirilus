import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        email: Joi.string().email().required(),
        passwd: Joi.string().required(),
    }),
});
