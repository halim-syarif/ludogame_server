const { getRoomId, checkTurnOrder } = require('../helpers/helpersFunction')
const { createPawns } = require('../helpers/pawnModel')
const { Player, Room, Pawn } = require('../models')

class Controller {
  // static async createRoom(req, res, next) {
  //   try {
  //     const { wallet, pawn, total_player, bet } = req.body

  //     if (!wallet || !pawn.length || !total_player || !bet) {
  //       throw ({
  //         name: "Data incomplete"
  //       })
  //     }

  //     const existPlayer = await Player.findOne({
  //       wallet,
  //       status: true
  //     })

  //     if(existPlayer){
  //       const activeRoom = await Room.findById(existPlayer.room)
  //       throw({ name: "Active Player", payload: activeRoom.room_id })
  //     }

  //     const newPawns = await Pawn.insertMany(pawn)
  //     const idsPawn = newPawns.map(el => {
  //       return el.id
  //     })
  //     console.log(idsPawn);

  //     const newPlayer = await Player.create({ 
  //       wallet, 
  //       pawn_active: idsPawn 
  //     })

  //     let activeRoom = null

  //     activeRoom = await Room.findOneAndUpdate({
  //       status: true,
  //       total_player,
  //       $where: `this.players.length < ${total_player}`
  //     }, {
  //       $push: { players: newPlayer._id }
  //     })


  //     if (!activeRoom) {
  //       const room = await Room.findOne(null, { room_id: 1, _id: 0 }).sort({_id:1});
  //       const newRoomId = getRoomId(room? room.room_id : null)
  //       activeRoom = await Room.create({
  //         room_id: newRoomId,
  //         total_player,
  //         bet,
  //         start_date: new Date(),
  //         start_time: new Date().getTime(),
  //         players: [newPlayer]
  //       })
  //     }

  //     await Player.findByIdAndUpdate(newPlayer._id, {
  //       room: activeRoom._id
  //     })

  //     const result = await Room.findById(activeRoom.id)
  //     .populate({
  //       path: 'players',
  //       populate: {
  //         path: 'pawn_active'
  //       }
  //     })

  //     res.status(200).json({
  //       message: "success",
  //       data: result
  //     })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createRoom(req, res, next) {
    try {
      const { wallet, player_color, total_player, bet } = req.body

      if (!wallet || !player_color || !total_player || !bet) {
        throw ({
          name: "Data incomplete"
        })
      }

      const existPlayer = await Player.findOne({
        wallet,
        status: true
      })

      if(existPlayer){
        const activeRoom = await Room.findById(existPlayer.room)
        throw({ name: "Active Player", payload: activeRoom.room_id })
      }

      const newPlayer = await Player.create({ 
        wallet, 
        color: player_color,
        pawn_active: [] 
      })

      let activeRoom = null

      activeRoom = await Room.findOne({
        status: true,
        total_player,
        bet,
        $where: `this.players.length < ${total_player}`
      }).populate('players')

      if (activeRoom) {
        let isColorAvailable = true
        for (let i = 0; i < activeRoom.players.length; i ++){
          let player = activeRoom.players[i]
          if(player.color === player_color){
            console.log("sama");
            isColorAvailable = false
            break
          }
        }

        if(isColorAvailable){
          await Room.findByIdAndUpdate( activeRoom._id, {
            $push: { players: newPlayer._id }
          })
        } else {
          activeRoom = null
        }
      }


      if (!activeRoom) {
        const room = await Room.findOne(null, { room_id: 1, _id: 0 }).sort({_id:1});
        const newRoomId = getRoomId(room? room.room_id : null)
        activeRoom = await Room.create({
          room_id: newRoomId,
          total_player,
          bet,
          start_date: new Date(),
          start_time: new Date().getTime(),
          players: [newPlayer]
        })
      }

      await Player.findByIdAndUpdate(newPlayer._id, {
        room: activeRoom._id
      })

      const result = await Room.findById(activeRoom.id)
      .populate({
        path: 'players'
      })

      if(result.players.length === total_player){
        for (let i = 0; i < result.players.length; i++){
          const player = result.players[i]
          const pawns = createPawns(player.color)
          const newPawns = await Pawn.insertMany(pawns)
          const idsPawn = newPawns.map(el => {
            return el.id
          })
          await Player.findByIdAndUpdate(player._id, {pawn_active: idsPawn})
        }
        await Room.findByIdAndUpdate(activeRoom._id, {turn_order: checkTurnOrder()})
        const newPlayers = await Room.findById(activeRoom._id).populate({
          path: "players",
          populate: {
            path: "pawn_active"
          }
        })
        // req.io.sockets.emit(`updatePlayer-${activeRoom.room_id}`, {players: result.players, turnOrder: checkTurnOrder()});
        req.io.sockets.emit(`updatePlayer`, newPlayers.players);
      }


      res.status(200).json({
        message: "success",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getPlayers(req, res, next) {
    try {
      const Players = await Player.findAll().include("Pawn")
      res.status(200).json(Players)
    } catch (err) {
      next(err)
    }
  }

  static async getRoom(req, res, next) {
    try {
      const { room_id } = req.params
      const Rooms = await Room.findOne({room_id}).populate({
        path: "players",
        populate: {
          path: "pawn_active"
        }
      })
      res.status(200).json({players: Rooms.players, turnOrder: Rooms.turn_order})
    } catch (error) {
      next(error)
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const { pawn_id } = req.params
      const pawn = await Pawn.findByIdAndUpdate({pawn_id})

      res.status(200).json(pawn)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller