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

async function getCustomerById(req, res) {
	try {
		const id = req.params.id;
		const customer = await db.query(
			`SELECT * FROM customers WHERE id = $1`,
			[id]
		);
		if (customer.rowCount === 0) {
			return res.sendStatus(404);
		}
		res.status(200).send(customer.rows[0]);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postCustomer, getCustomers, getCustomerById };
