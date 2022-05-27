import { Router } from "express";
import { getCategories } from "../controllers/categories.js";

const categoriesRouter = Router();

categoriesRouter.post('/categories', getCategories);

export default categoriesRouter;
