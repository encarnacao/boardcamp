import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const rentalSchema = Joi.object({
	customerId: Joi.number().integer().required(),
	gameId: Joi.number().integer().required(),
	rentDate: Joi.date().format("YYYY-MM-DD").required(),
	daysRented: Joi.number().integer().required(),
	returnDate: Joi.date().format("YYYY-MM-DD"),
	originalPrice: Joi.number().integer().required(),
	delayFee: Joi.number().integer(),
});

export default rentalSchema;
