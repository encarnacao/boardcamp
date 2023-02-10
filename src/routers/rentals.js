import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentals.js";
import {
	validateRental,
	checkCustomerId,
	checkGameId,
} from "../middlewares/rentals.js";

const router = Router();

router.post(
	"/rentals",
	validateRental,
	checkCustomerId,
	checkGameId,
	postRental
);

router.get("/rentals", getRentals)

export default router;
