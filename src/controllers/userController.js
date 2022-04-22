const User = require('../model/user')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')
require('dotenv').config()
const TOKEN_KEY = process.env.TOKEN_KEY

class userController {
    indexRegister(req, res, next) {
        res.render('user/register')        
    }
    async register(req, res, next) {
        const {fullname,email,password} = req.body
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(409).send(`User Already Exist. Please Login <a href="/user/login">login</a>`)
        }else{
            const encryptedPassword =await bcrypt.hash(password,10)
            const user = await new User ({
                fullname,
                email,
                password: encryptedPassword,
                category: req.body.category
            })
                try{
                    user.save();
                    res.status(201).redirect('/user/login')
                }
                catch{res.status(500).send('Internal Server Error')}
            }
    }
    indexLogin(req, res, next) {
        try {
            res.status(200).render('user/login')

        }
        catch (next) {
            res.status(500).send('Internal Server Error')
        }
    }
    async login(req, res, next) {
        const {email,password} = req.body
        const oldUser = await User.findOne({email})
        const encodePassword = await bcrypt.compareSync(password, oldUser.password)

        if(oldUser&&encodePassword){
            const token = jwt.sign(
                { user_id: oldUser._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
        
              // save user token
              oldUser.token = token;
              oldUser.save();
                res.status(302).redirect('/')
        }else {
            return res.status(404).send(`please create User   <a href="/user/register">register</a>`)
        }
    }
}

module.exports = new userController;