import rentalSchema from "../schemas/rentals.js";

function validateRental(req, res, next) {
	const { error } = rentalSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(400).send(errorMessage);
	}
	next();
}

async function checkCustomerId(req, res, next) {
	const { customerId } = req.body;
	const { rows } = await db.query("SELECT * FROM customers WHERE id = $1", [
		customerId,
	]);
	if (rows.length === 0) {
		return res.sendStatus(400);
	}
	next();
}

export { validateRental, checkCustomerId };
