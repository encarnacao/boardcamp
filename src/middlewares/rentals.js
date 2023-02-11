import rentalSchema from "../schemas/rentals.js";
import { db } from "../database.connection.js";

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
			return res.status(400).send("Invalid Customer ID");
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
		const { rowCount } = await db.query(
			`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
			[gameId]
		);
		if (rows.length === 0) {
			return res.status(400).send("Invalid Game ID");
		} else if (rows[0].stockTotal === rowCount) {
			return res.status(400).send("Game out of stock");
		}
		res.locals.game = rows[0];
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function checkRentalId(req, res, next) {
	try {
		const { id } = req.params;
		const { rows } = await db.query("SELECT * FROM rentals WHERE id = $1", [
			id,
		]);
		if (rows.length === 0) {
			return res.status(404).send("Invalid Rental ID");
		} else if (rows[0].returnDate) {
			return res.status(400).send("Rental already returned");
		}
		res.locals.rental = rows[0];
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { validateRental, checkCustomerId, checkGameId, checkRentalId };
