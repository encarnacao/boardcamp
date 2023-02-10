import { db } from "../database.connection.js";

async function getGames(_, res) {
	try {
		const games = await db.query("SELECT * FROM games");
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
