import { Router } from "express";
import { getGames, postGame } from "../controllers/games.js";
import { validateGame, checkGameConflict } from "../middlewares/games.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGame, checkGameConflict, postGame);

export default router;
