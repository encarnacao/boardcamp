import { db } from "../database.connection.js";
import gameSchema from "../schemas/games.js";

function validateGame(req, res, next) {
	const { error } = gameSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(400).send(errorMessage);
	}
	next();
}

async function checkConflicts(req, res, next) {
    const { name } = req.body;
    const games = await db.query("SELECT * FROM games WHERE name = $1", [name]);
    if (games.rowCount > 0) {
        return res.status(409).send("Game already exists in the database.");
    }
    next();
}

export { validateGame, checkConflicts };
