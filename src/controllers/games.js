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

export { getGames };
