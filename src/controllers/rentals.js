import dayjs from "dayjs";
import { db } from "../database.connection.js";
import { escape } from "mysql";

function calculateDays(date1, date2) {
	const days = dayjs(date2).diff(date1, "day");
	return days;
}

function addDays(date, days) {
	const newDate = dayjs(date).add(days, "day");
	return newDate.$d;
}

function calculateFee(rentDate, days, price) {
	const returnDate = addDays(rentDate, days);
	const today = dayjs().format("YYYY-MM-DD");
	const daysLate = calculateDays(returnDate, today);
	const delayFee = daysLate > 0 ? daysLate * price : 0;
	return delayFee;
}

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

function buildRentalQuery(
	customerId,
	gameId,
	offset,
	limit,
	order,
	desc,
	status,
	startDate
) {
	let query = `
        SELECT
        rentals.*,
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
    	`;
	const whereClause = [
		customerId ? `customers.id = ${escape(customerId)}` : null,
		gameId ? `games.id = ${escape(gameId)}` : null,
		status
			? `rentals."returnDate" IS ${status === "closed" ? "NOT" : ""} NULL`
			: null,
		startDate ? `rentals."rentDate" >= ${escape(startDate)}` : null,
	]
		.filter(Boolean)
		.join(" AND ");
	if (whereClause) {
		query += ` WHERE ${whereClause}`;
	}
	query += offset ? ` OFFSET ${escape(offset)}` : "";
	query += limit ? ` LIMIT ${escape(limit)}` : "";
	query += order ? ` ORDER BY "${order}"` : "";
	query += desc === "true" ? ` DESC` : "";
	return query;
}

async function getRentals(req, res) {
	try {
		const {
			customerId,
			gameId,
			offset,
			limit,
			order,
			desc,
			status,
			startDate,
		} = req.query;
		const query = buildRentalQuery(
			customerId,
			gameId,
			offset,
			limit,
			order,
			desc,
			status,
			startDate
		);
		const { rows } = await db.query(query);
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

async function returnRental(req, res) {
	try {
		const { id } = req.params;
		const { rentDate, daysRented, originalPrice } = res.locals.rental;
		const pricePerDay = originalPrice / daysRented;
		const delayFee = calculateFee(rentDate, daysRented, pricePerDay);
		const returnDate = dayjs().format("YYYY-MM-DD");
		await db.query(
			`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
			[returnDate, delayFee, id]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { postRental, getRentals, deleteRental, returnRental };
