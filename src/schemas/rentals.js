import Joi from "joi";

const rentalSchema = Joi.object({
	customerId: Joi.number().integer().required(),
	gameId: Joi.number().integer().required(),
	daysRented: Joi.number().integer().required(),
});

export default rentalSchema;
