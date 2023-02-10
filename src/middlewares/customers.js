import { db } from "../database.connection.js";
import customerSchema from "../schemas/customers.js";

function validateCustomer(req, res, next) {
	const { error } = customerSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(400).send(errorMessage);
	}
	next();
}

async function checkCustomerConflict(req, res, next) {
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

async function checkCustomerId(req, res, next) {
	try {
		const id = req.params.id;
		if (isNaN(id) || !Number.isInteger(Number(id)))
			return res.status(422).send("Invalid ID, must be an integer");
		const { rows } = await db.query(
			`SELECT * FROM customers WHERE id = $1`,
			[id]
		);
		if (rows.length === 0) {
			return res.sendStatus(404);
		}
		res.locals.customer = rows[0];
		next();
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { validateCustomer, checkCustomerConflict, checkCustomerId };
