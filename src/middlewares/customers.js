import customerSchema from "../schemas/customers.js";

function validateCustomer(req, res, next) {
	const { error } = customerSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(422).send(errorMessage);
	}
	next();
}

export { validateCustomer };
