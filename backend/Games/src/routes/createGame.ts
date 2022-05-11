import express, { Request, Response } from 'express';


import GameModel from '../models/game';

const  PlayerSchema  = require("../../../GamePlayers/src/models/gamePlayer");

const router = express.Router();

router.post(
  '/api/Game',
  async (req: Request, res: Response) => {
    const {PlayerSchema} = req.body;
    const game = GameModel.build( PlayerSchema );
    await game.save();


    res.status(201).send(game);
  }
);

export { router as gameRouter };
