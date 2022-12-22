import { validate, Joi } from "express-validation";

export default validate({
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        birth: Joi.date().required(),
        passwd: Joi.string().min(8).required(),
        // typeUserId: Joi.string().hex().required(),
        employee: Joi.object({
            
        })
    }),
});