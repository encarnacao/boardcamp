import { Router } from "express";
import { postRental } from "../controllers/rentals.js";
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

export default router;
