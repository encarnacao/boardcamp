import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const customerSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().min(11).max(12).regex(/^\d+$/).required(),
	cpf: Joi.string().length(11).regex(/^\d+$/).required(),
	birthday: Joi.date().format("YYYY-MM-DD").required(),
});

export default customerSchema;
