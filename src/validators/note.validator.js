import Joi from "@hapi/joi";
import { log } from "winston";

export const newNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().optional

    })
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        // Client side error
        next();
    }
}