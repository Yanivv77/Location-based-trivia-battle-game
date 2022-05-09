import express, { Request, Response } from "express";
import { GamePlayerModel } from "../models/gamePlayer";

const getAllGamePlayers = async (req: Request, res: Response) => {
  let gamePlayer = await GamePlayerModel.find();
  res.send(gamePlayer);
};

const getGamePlayerByName = async (req: Request, res: Response) => {
  let { userName } = req.params;
  let gamePlayerToFind = await GamePlayerModel.findOne({
    user_name: userName,
  });

  if (gamePlayerToFind == null) {
    // return res.status(400).send("player not exist!");
    return res.status(400).send({ message: "player not exist!" });
  }

  res.send(gamePlayerToFind);
};

const addGamePlayer = async (req: Request, res: Response) => {
  //Check if player already exist in DB
  let { userName, gameId, answers, helpersStatus } = req.body;
  let gamePlayerToFind = await GamePlayerModel.findOne({
    user_name: userName,
  });

  // if gamePlayerToFind !==null => meaning: 'player exist'
  if (gamePlayerToFind !== null) {
    // return res.status(400).send("player already exist!");
    return res.status(400).send({ message: "player already exist!" });
  }
  // if player not exist create new  gamePlayer model and save to DB
  let newGamePlayer = new GamePlayerModel({
    user_name: userName,
    game_id: gameId,
    answers: answers,
    helpers_used_status: helpersStatus,
  });
  let result = await newGamePlayer.save();
  return res.send(result);
};

export { getAllGamePlayers, getGamePlayerByName, addGamePlayer };
