import { Schema, model } from "mongoose";

import {gamePlayerSchema} from '../../../GamePlayers/src/models/gamePlayer';


const RoomSchema = new Schema({

    players: {
        type: [gamePlayerSchema],
        required: false
    },

});

const RoomModel = model("room", RoomSchema);

module.exports = {
    RoomModel,
    RoomSchema
}