import { Router } from "express";
import { getCustomers, getCustomer, postCustomer, updateCustomer } from "../controllers/customers.js";
import {validateCustomer, validatePost, validatePut} from "../middlewares/validateCustomer.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);

customersRouter.get('/customers/:id', getCustomer);

customersRouter.post('/customers', validateCustomer, validatePost, postCustomer);

customersRouter.put('/customers/:id', validateCustomer, validatePut, updateCustomer);

export default customersRouter;
