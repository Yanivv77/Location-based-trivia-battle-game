import express from "express";

import {
  getAllGamePlayers,
  getGamePlayerByName,
  addGamePlayer,
} from "../controllers/gamePlayers";

const router = express.Router();

router.get("/", getAllGamePlayers);
router.get("/:userName", getGamePlayerByName);
router.post("/", addGamePlayer);

export { router as gamePlayers };
