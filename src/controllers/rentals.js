import dayjs from "dayjs";
import { db } from "../database.connection.js";

async function postRental(req, res) {
	try {
		const { customerId, gameId, daysRented } = req.body;
		const todayDate = dayjs().format("YYYY-MM-DD");
		const originalPrice = res.locals.game.pricePerDay * daysRented;
		await db.query(
			`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[
				customerId,
				gameId,
				todayDate,
				daysRented,
				null,
				originalPrice,
				null,
			]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function getRentals(_, res) {
	try {
		const { rows } = await db.query(`
        SELECT
        rentals.*,
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
    `);
		res.send(rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function deleteRental(req, res) {
	try {
		const { id } = req.params;
		await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postRental, getRentals, deleteRental };
