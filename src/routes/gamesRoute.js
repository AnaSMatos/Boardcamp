import { Router } from "express";
import { getGames, postGame } from "../controllers/games.js";
import { validateGames } from "../middlewares/validateGame.js";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);

gamesRouter.post('/games', validateGames, postGame);

export default gamesRouter;
