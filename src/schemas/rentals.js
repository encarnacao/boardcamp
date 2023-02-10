import Joi from "joi";

const rentalSchema = Joi.object({
    customerId: Joi.number().integer().required(),
    gameId: Joi.number().integer().required(),
    rentDate: Joi.date().required(),
    daysRented: Joi.number().integer().required(),
    returnDate: Joi.date(),
    originalPrice: Joi.number().integer().required(),
    delayFee: Joi.number().integer(),
});

export default rentalSchema;