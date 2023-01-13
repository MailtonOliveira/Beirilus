import {validate,Joi} from "express-validation";

export default validate({
    body: Joi.object({
        type: Joi.string().required()
    })
});