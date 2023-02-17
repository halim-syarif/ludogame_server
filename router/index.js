const router = require('express').Router()
const Controller = require('../controller')
const { authentication } = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')

// router.use(authentication)

router.post('/room/create', Controller.createRoom)
router.get('/player', Controller.getPlayers)
router.get('/room/:room_id', Controller.getRoom)
router.post('/pawn/change_status/:pawn_id', Controller.changeStatus)


router.use(errorHandler)

module.exports = router