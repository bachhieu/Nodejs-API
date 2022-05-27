const jwt = require('jsonwebtoken')
const User = require('../model/user')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const access_token = req.query.token || req.body.token || req.headers["x-access-token"]||req.cookies.token
    const refresh_token = req.query.refresh_token || req.body.refresh_token || req.headers["x-refresh-token"]|| req.cookies.refresh_token
    // console.log('token:'+access_token,
    // 'ref:' +refresh_token)
    if(!access_token||!refresh_token ) {
        return res.status(400).send('not found access token, please <a href="/user/register">register</a> or <a href="/user/login">login</a>')
    }
    try{
        const decoded = jwt.verify(access_token,process.env.TOKEN_KEY)
        req.user = decoded
        // console.log(decoded)
        console.log('check token success')  
    }
    catch(err) {
       if(err.name === 'TokenExpiredError'){
        const decoded = jwt.verify(access_token, process.env.TOKEN_KEY,{ignoreExpiration:true})
        const email = decoded.email
        const user = await User.findOne({email})

        // console.log(user.email)
        // console.log(user.refresh_token)
        // console.log(refresh_token)
        if(refresh_token!==user.refresh_token){
            return res.status(400).send('refresh token is not available')
        }
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token; 
          user.save();
          req.user = decoded
       }else if (err.name==='JsonWebTokenError'){
           return res.status(400).send('A token is available');
       }
    }
    return next()
}
module.exports = {verifyToken};