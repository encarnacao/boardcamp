import rentalSchema from "../schemas/rentals.js";

function validateRental(req, res, next) {
	const { error } = rentalSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(400).send(errorMessage);
	}
	next();
}

export { validateRental };
