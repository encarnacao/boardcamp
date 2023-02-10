import { Router } from "express";
import { getCustomers, postCustomer } from "../controllers/customers.js";
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

router.get("/customers", getCustomers);

export default router;
