import { Router } from "express";
import {
	deleteRental,
	getRentals,
	postRental,
	returnRental,
} from "../controllers/rentals.js";
import {
	validateRental,
	checkCustomerId,
	checkGameId,
	checkRentalId,
} from "../middlewares/rentals.js";

const router = Router();

router.post(
	"/rentals",
	validateRental,
	checkCustomerId,
	checkGameId,
	postRental
);

router.get("/rentals", getRentals);

router.delete("/rentals/:id", checkRentalId, deleteRental);

router.post("/rentals/:id/return", checkRentalId, returnRental);

export default router;
