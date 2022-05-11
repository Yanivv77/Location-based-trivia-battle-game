import express, { Request, Response } from "express";
import GameModel  from "../../../Games/src/models/game";

const { PlayerSchema } = require("../../../GamePlayers/src/models/gamePlayer");
const { QuestionsSchema } = require("../../../questions/src/models/question");


const CreateGame = async (req: Request, res: Response) => {

  let CreateGame = new GameModel({
    PlayerSchema: PlayerSchema,
    QuestionsSchema: QuestionsSchema,
  });
  let result = await CreateGame.save();
  return res.send(result);
};

export { CreateGame };
