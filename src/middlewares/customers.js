import { db } from "../database.connection.js";
import customerSchema from "../schemas/customers.js";

function validateCustomer(req, res, next) {
	const { error } = customerSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(422).send(errorMessage);
	}
	next();
}

async function checkConflict(req, res, next) {
	try {
		const { cpf } = req.body;
		const customer = await db.query(
			`SELECT * FROM customers WHERE cpf = $1`,
			[cpf]
		);
		if (customer.rowCount > 0) {
			return res.sendStatus(409);
		}
		next();
	} catch {
		console.log(error);
		res.sendStatus(500);
	}
}

export { validateCustomer };
