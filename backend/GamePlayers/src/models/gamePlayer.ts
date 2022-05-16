import { string } from "joi";
import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new GamePlayer
interface GamePlayerAttrs {
  user_name: string;
  game_id: number;
  answers: Array<any>;
  helpers_used_status: {
    follow: boolean;
    statistics: boolean;
    halfAnswers: boolean;
  };
}

interface GamePlayerModel extends mongoose.Model<GamePlayerDoc> {
  build(attrs: GamePlayerAttrs): GamePlayerDoc;
}

// An interface that describes the properties
// that a GamePlayer Document has
interface GamePlayerDoc extends mongoose.Document {
  user_name: string;
  game_id: number;
  answers: Array<any>;
  helpers_used_status: {
    follow: boolean;
    statistics: boolean;
    halfAnswers: boolean;
  };
}

const gamePlayerSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  game_id: {
    type: Number,
    required: true,
  },
  answers: {
    type: [],
    required: true,
  },
  helpers_used_status: {
    type: Object,
    required: true,
  },
});

gamePlayerSchema.statics.build = (attrs: GamePlayerAttrs) => {
  return new GamePlayer(attrs);
};
// const GamePlayer: GamePlayerAttrs = mongoose.model("GamePlayer", gamePlayerSchema);

const GamePlayer = mongoose.model<GamePlayerDoc, GamePlayerModel>(
  "GamePlayer",
  gamePlayerSchema
);

// exports.GamePlayerModel = GamePlayer;
export { GamePlayer as GamePlayerModel, gamePlayerSchema };
