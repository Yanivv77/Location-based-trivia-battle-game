import express, { Request, Response } from 'express';


import GameModel from '../models/game';

const  PlayerSchema  = require("../../../GamePlayers/src/models/gamePlayer");
const  QuestionsSchema  = require("../../../questions/src/models/question");

const router = express.Router();

router.post(
  '/api/Game',
  async (req: Request, res: Response) => {
    const { PlayerSchema, QuestionsSchema } = req.body;
    const game = GameModel.build({ PlayerSchema ,QuestionsSchema });
    await game.save();


    res.status(201).send(game);
  }
);

export { router as gameRouter };
