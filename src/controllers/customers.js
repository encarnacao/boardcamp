import { db } from "../database.connection.js";
import { escape } from "mysql";

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

function buildCustomerQuery(cpf, offset, limit) {
	let query = "SELECT * FROM customers";
	query += cpf ? ` WHERE cpf ILIKE ${escape(`${cpf}%`)}` : "";
	query += offset ? ` OFFSET ${escape(offset)}` : "";
	query += limit ? ` LIMIT ${escape(limit)}` : "";
	return query;
}

async function getCustomers(req, res) {
	try {
		const { cpf, offset, limit } = req.query;
		const query = buildCustomerQuery(cpf, offset, limit);
		const customers = await db.query(query);
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
