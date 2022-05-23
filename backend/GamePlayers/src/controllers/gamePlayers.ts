import express, { Request, Response } from "express";
import { GamePlayerModel } from "../models/gamePlayer";

const getAllGamePlayers = async (req: Request, res: Response) => {
  let gamePlayers = await GamePlayerModel.find();
  return res.status(201).send(gamePlayers);
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

  return res.status(201).send(gamePlayerToFind);
};

const addGamePlayer = async (req: Request, res: Response) => {
  //Check if player already exist in DB
  let { userName, gameId } = req.body;
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
    answers: [],
    helpers_used_status: {
      follow: false,
      statistics: false,
      halfAnswers: false,
    },
  });
  let result = await newGamePlayer.save();
  return res.status(201).send(result);
};

const updatePlayerHelpers = async (req: Request, res: Response) => {
  let { user_name, helper } = req.body;
  let result: any;
  switch (helper) {
    case "follow":
      result = await GamePlayerModel.updateOne(
        //where user_name == user_name
        { user_name },
        {
          $set: {
            "helpers_used_status.follow": true,
          },
        }
      );
      break;
    case "statistics":
      result = await GamePlayerModel.updateOne(
        //where user_name == user_name
        { user_name },
        {
          $set: {
            "helpers_used_status.statistics": true,
          },
        }
      );
      break;
    case "halfAnswers":
      result = await GamePlayerModel.updateOne(
        //where user_name == user_name
        { user_name },
        {
          $set: {
            "helpers_used_status.halfAnswers": true,
          },
        }
      );
      break;
  }

  return res.status(201).send(result);
};

const updatePlayerAnswers = async (req: Request, res: Response) => {
  let { user_name, answer } = req.body;

  let result = await GamePlayerModel.updateOne(
    //where user_name == user_name
    { user_name },
    {
      $push: { answers: answer },
    }
  );

  return res.status(201).send(result);
};

export {
  getAllGamePlayers,
  getGamePlayerByName,
  addGamePlayer,
  updatePlayerHelpers,
  updatePlayerAnswers,
};
