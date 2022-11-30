const httpStatus = require("http-status")

const errorHandler = async (err, req, res, next) => {
    if(typeof err === 'string') {
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            message: err
        })
    }

    if(typeof err === 'object') {
        let message, status = err.status || 500, isOperationalError = false
        if(err.name) {
            switch(err.name) {
                case "SequelizeAccessDeniedError":
                    status = httpStatus.INTERNAL_SERVER_ERROR
                    message = "Error connecting database!"
                break;
                case "SequelizeUniqueConstraintError":
                    status = httpStatus.BAD_REQUEST
                    message = err.errors.map(e => e.message).join(', ')
                break;
                case "validationError":
                    const temp = {}
                    err.errors.map(i => {
                        if(!Array.isArray(temp[i.param])) {
                            temp[i.param] = [ i.msg ]
                        } else {
                            temp[i.param].push(i.msg)
                        }
                    })
                    status = httpStatus.BAD_REQUEST
                    message = temp 
                break;
                default: 
                    message = (err.message && typeof err.message === 'string' ? err.message : err)
                    isOperationalError = true 
            }

            return res.status(status).json({
                error: true,
                name: err.name,
                message,
                isOperationalError
            })
        } else if (err.message && typeof err.message === 'string') {
            return res.status(status).json({
                error: true,
                message: err.message,
            })
        }
    }
    
    return res.status(httpStatus.BAD_REQUEST).json({
        error: true,
        message: err,
    })
}

module.exports = errorHandler