const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")


const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const { id } = verifyToken(access_token)
        const user = await User.findByPk(id)

        if(!user){
            throw ({name: 'Token Invalid'})
        }

        req.userLogin = {
            id: user.id,
            email: user.email
        }

        next()

    } catch (err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    
    try {
        const {id, email} = req.userLogin
        let foundUser = await User.findByPk(id)

        if(email !== foundUser.email){
            throw {name: 'Authorization Failed'}
        }
        next()
        
    } catch (err) {
        next(err)
    }
}


module.exports = {
    authentication,
    authorization
}