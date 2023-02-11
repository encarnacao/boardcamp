import { db } from "../database.connection.js";
import { escape } from "mysql";

function buildGameQuery(name, offset, limit, order, desc) {
	let query = "SELECT * FROM games";
	query += name ? ` WHERE name ILIKE ${escape(`${name}%`)}` : "";
	query += offset ? ` OFFSET ${escape(offset)}` : "";
	query += limit ? ` LIMIT ${escape(limit)}` : "";
	query += order ? ` ORDER BY "${order}"` : "";
	query += desc === "true" ? ` DESC` : "";
	return query;
}

async function getGames(req, res) {
	try {
		const { name, offset, limit, order, desc } = req.query;
		let query = buildGameQuery(name, offset, limit, order, desc);
		const games = await db.query(query);
		res.status(200).send(games.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function postGame(req, res) {
	try {
		const { name, image, stockTotal, pricePerDay } = req.body;
		await db.query(
			`
			INSERT INTO games (name, image, "stockTotal", "pricePerDay")
			VALUES ($1, $2, $3, $4)
		`,
			[name, image, stockTotal, pricePerDay]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { getGames, postGame };
