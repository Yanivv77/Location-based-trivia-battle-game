
const { PlayerSchema } = require("../../../GamePlayers/src/models/gamePlayer");


let mongoose = require('mongoose');

let GameSchema = new mongoose.Schema({
   players: [PlayerSchema],
});


let GameModel = mongoose.model('Game', GameSchema);

export = GameModel;
