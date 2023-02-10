import Joi from "joi";

const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    birthday: Joi.date().required(),
});

export default customerSchema;