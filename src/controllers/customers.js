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

async function getCustomers(_, res) {
	try {
		const customers = await db.query("SELECT * FROM customers");
		res.send(customers.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function getCustomerById(_, res) {
	try {
		res.status(200).send(res.locals.customer);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

async function updateCustomer(req, res) {
	try {
		const { id } = req.params;
		const { name, phone, cpf, birthday } = req.body;
		await db.query(
			"UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
			[name, phone, cpf, birthday, id]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postCustomer, getCustomers, getCustomerById, updateCustomer };
