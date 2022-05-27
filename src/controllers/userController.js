const User = require('../model/user')
const Books = require('../model/book')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token').generator()
require('dotenv').config()
const TOKEN_KEY = process.env.TOKEN_KEY

class userController {
    async detail(req, res, next){
        const {email}=req.user.email
       await User.findOne(email,{_id:0,fullname:1,gender:1,books:2,avatar:1,tel:1}).lean()
        .then(async user =>{

        const books = await Books.find({_id:{$in : user.books}})
            res.status(200).render('user/profile',{user,books})
        })
    }
    edit(req, res, next){
        res.status(200).render('user/edit')
    }
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
            res.status(200)
            .clearCookie('token')
            .clearCookie('refresh_token')
            .render('user/login')

        }
        catch (next) {
            res.status(500).send('Internal Server Error')
        }
    }
    async login(req, res, next) {
        try {
        const {email,password} = req.body
        // console.log(email)
        const oldUser = await User.findOne({email})
        // console.log(oldUser)
        if(!oldUser) {
            return res.status(404).send(`please create User   <a href="/user/register">register</a>`)
        }
        const encodePassword = await bcrypt.compareSync(password, oldUser.password)
        if(encodePassword){
            let token = jwt.sign(
                { user_id: oldUser._id, email,ROLES:oldUser.role },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
                
              // save user token
              oldUser.token = token;
              let refresh_token
              if(!oldUser.refresh_token){
                  refresh_token = randtoken.generate(255, "abcdefghijklnmopqrstuvwxyz")
                  oldUser.refresh_token = refresh_token
                } else{
                    refresh_token = oldUser.refresh_token
              }


                oldUser.save();
                res.status(302)
                    .cookie('token',token,{ expires: new Date(Date.now() + 60*60*24*30*3), httpOnly: true, })
                    .cookie('refresh_token',refresh_token,{ expires: new Date(Date.now() + 60*60*24*30*3), httpOnly: true, })
                    .redirect('/')
        }else {
            return res.status(404).send(`please login again User   <a href="/user/login">login</a>`)
        }
        }catch(e){
            console.log(e.message)
            res.send(e.message)
        }
    }
    welcome(req, res, next){
        res.status(200).send(req.user)
    };

}

async function findOneByEmail(email){
    const user = await User.findOne({email})
    return user
}

module.exports = new userController;