import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const customerSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().required(),
	cpf: Joi.string().length(11).required(),
	birthday: Joi.date().format("YYYY-MM-DD").required(),
});

export default customerSchema;
