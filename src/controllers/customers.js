import { db } from "../database.connection.js";

async function postCustomer(req, res) {
	try {
		const { name, phone, cpf, birthday } = req.body;
		await db.query(
			"INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
			[name, phone, cpf, birthday]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postCustomer };
