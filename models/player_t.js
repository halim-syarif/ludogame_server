const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    wallet: String,
    status: {
      type: Boolean,
      default: true
    },
    color: String,
    pawn_active: [
      {
        type: Schema.Types.ObjectId,
        ref: "t_pawn"
      }
    ],
    room: {
      type: Schema.Types.ObjectId,
      ref: "t_room"
    },
    rank: Number
  },
  { timestamps: true }
);

const Player = mongoose.model("t_player", playerSchema);

module.exports = Player;
