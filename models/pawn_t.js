const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pawnSchema = new Schema(
  {
    name: String,
    color: String,
    player: String,
    current_position: Number,
    status: {
      type: String,
      enum : ['home','active','win'],
      default: 'home'
    },
    current_step: String,
    previous_step: String,
    home: String,
    controller: String
  },
  { timestamps: true }
);

const Pawn = mongoose.model("t_pawn", pawnSchema);

module.exports = Pawn;
