import { Router } from "express";
import {
	getCustomerById,
	getCustomers,
	postCustomer,
	updateCustomer,
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

router.put(
	"/customers/:id",
	validateCustomer,
	checkCustomerId,
	checkCustomerConflict,
	updateCustomer
);

export default router;
