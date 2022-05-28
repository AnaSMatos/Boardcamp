import { Router } from "express";
import { getCustomers, getCustomer, postCustomer, updateCustomer } from "../controllers/customers.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);

customersRouter.get('/customers/:id', getCustomer);

customersRouter.post('/customers', postCustomer);

customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;
