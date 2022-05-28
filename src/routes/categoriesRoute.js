import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categories.js";
import validateName from "../middlewares/validateName.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);

categoriesRouter.post('/categories', validateName ,postCategory);

export default categoriesRouter;
