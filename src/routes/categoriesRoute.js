import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categories.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);

categoriesRouter.post('/categories', postCategory);

export default categoriesRouter;
