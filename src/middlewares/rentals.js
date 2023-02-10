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
	try {
		const { customerId } = req.body;
		const { rows } = await db.query(
			"SELECT * FROM customers WHERE id = $1",
			[customerId]
		);
		if (rows.length === 0) {
			return res.sendStatus(400);
		}
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function checkGameId(req, res, next) {
	try {
		const { gameId } = req.body;
		const { rows } = await db.query("SELECT * FROM games WHERE id = $1", [
			gameId,
		]);
		if (rows.length === 0) {
			return res.status(400).send("Invalid Game ID");
		} else if (rows[0]?.stockTotal < 1) {
			return res.status(400).send("Game out of stock");
		}
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { validateRental, checkCustomerId, checkGameId };
