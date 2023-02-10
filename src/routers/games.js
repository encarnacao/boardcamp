import { Router } from "express";
import { getGames, postGame } from "../controllers/games.js";
import { validateGame, checkConflicts } from "../middlewares/games.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGame, checkConflicts, postGame);

export default router;
