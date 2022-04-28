const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async (req, res, next) => {

    const token = req.query.token || req.body.token || req.headers["x-access-token"]
    if(!token) {
        return res.status(400).send("A token is required")
    }
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_KEY)
        req.user = decoded
    }
    catch(err) {
       return res.status(400).send("A token was not valid")
    }
    return next()
}
module.exports = verifyToken;