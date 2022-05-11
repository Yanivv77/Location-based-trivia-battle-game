
const { PlayerSchema } = require("../../../GamePlayers/src/models/gamePlayer");
const { QuestionsSchema } = require("../../../questions/src/models/question");

let mongoose = require('mongoose');

let GameSchema = new mongoose.Schema({
   players: [PlayerSchema],
   questions: [QuestionsSchema],
});


let GameModel = mongoose.model('Game', GameSchema);

export = GameModel;
