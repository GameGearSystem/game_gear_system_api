import express from "express";
import { getGames, getGame, createGame, updateGame, deleteGame } from "../controllers/game.controller";
import tokenValidatorMiddleware from "../core/middlewares/token-validator.middleware";

const router = express.Router();

router.get("/", tokenValidatorMiddleware, getGames);
router.get("/:uuid", tokenValidatorMiddleware, getGame);
router.post("/", tokenValidatorMiddleware, createGame);
router.put("/:uuid", tokenValidatorMiddleware, updateGame);
router.delete("/:uuid", tokenValidatorMiddleware, deleteGame);


export default router;