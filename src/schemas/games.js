import Joi from "joi";

const gameSchema = Joi.object({
    name: Joi.string().min(1).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().greater(0).required(),
    pricePerDay: Joi.number().integer().greater(0).required(),
});

export default gameSchema;