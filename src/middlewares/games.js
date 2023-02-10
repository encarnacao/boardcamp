import gameSchema from "../schemas/games.js";

function validateGame(req, res, next) {
	const { error } = gameSchema.validate(req.body);
	if (error) {
		const errorMessage = error.details.map((err) => err.message).join(", ");
		return res.status(422).send(errorMessage);
	}
	next();
}

export { validateGame };
