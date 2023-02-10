import { Router } from "express";
import { getGames, postGame } from "../controllers/games.js";
import { validateGame } from "../middlewares/games.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGame, postGame);

export default router;
