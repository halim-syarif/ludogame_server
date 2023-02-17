const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'internal server error'
    let data = null

    switch (err.name) {
        case 'Token Invalid':
            code = 400
            message = 'Authentication failed'
            break;
            
        case 'JsonWebTokenError':
            code = 400
            message = 'Please Login First'
            break;
                
        case 'Data incomplete':
            code = 401
            message = "Data incomplete"
            break;

        case 'Active Player':
            code = 401
            message = "You're still active on another room"
            data = err.payload
            break;

        default:
            break;
    }

    console.log(err);
    res.status(code).json({message, data})
}

module.exports = errorHandler