import rentalSchema from "../schemas/rentals";

function validateRental(req, res, next) {
	const { error } = rentalSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(422).send(errorMessage);
	}
	next();
}

export { validateRental };
