import express from "express";

import {
  getAllGamePlayers,
  getGamePlayerByName,
  addGamePlayer,
  updatePlayerHelpers,
  updatePlayerAnswers,
} from "../controllers/gamePlayers";

const router = express.Router();

router.get("/", getAllGamePlayers);
router.get("/:userName", getGamePlayerByName);
router.post("/", addGamePlayer);
router.put("/updatePlayerHelper", updatePlayerHelpers);
router.put("/updatePlayerAnswers", updatePlayerAnswers);


export { router as gamePlayers };
