import { Router } from "express";
import {
	getCustomerById,
	getCustomers,
	postCustomer,
} from "../controllers/customers.js";
import {
	checkCustomerConflict,
	checkCustomerId,
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

router.get("/customers/:id", checkCustomerId, getCustomerById);

export default router;
