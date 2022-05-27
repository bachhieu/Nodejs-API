const Books = require('../model/book')

async function authRole(req, res, next){
    const book= await Books.findOne({slug: req.params.slug},{authorID:1})
    // console.log(book.authorID.toString())
    // console.log(req.user.user_id.toString())
    if(req.user.ROLES=='VIEWER'&&req.user.user_id.toString()!==book.authorID.toString()){
        return res.status(403).send('not allowed, you only view this book')
    }
    next()
}

module.exports ={authRole}