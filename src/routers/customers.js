import { Router } from "express";
import { postCustomer } from "../controllers/customers.js";
import {
	checkCustomerConflict,
	validateCustomer,
} from "../middlewares/customers.js";

const router = Router();

router.post(
	"/customers",
	validateCustomer,
	checkCustomerConflict,
	postCustomer
);

export default router;
