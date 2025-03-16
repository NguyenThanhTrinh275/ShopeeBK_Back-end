const logger = require("./logger")

const errorHandler = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message : err.message ,
    })
    console.log(err.stack)
    if(statusCode === 500)
        logger.error(`${req.method} ${req.url} - ${err.stack || err.message}`);
}

module.exports = errorHandler
