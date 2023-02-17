const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    room_id: String,
    total_player: Number,
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "t_player"
      }
    ],
    bet: Number,
    start_date: Date,
    start_time: String,
    end_time: String,
    turn_order: [],
    winners: [
      {
        type: Schema.Types.ObjectId,
        ref: "t_player"
      }
    ],
    status: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("t_room", roomSchema);

module.exports = Room;
