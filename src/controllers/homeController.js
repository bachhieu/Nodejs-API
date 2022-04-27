const Book = require('../model/book')
class HomeController {
    index(req, res, next) {
        Book.find().lean()
        .then(book => {
            res.status(200).render('home',{book})
        })
        .catch(()=> res.status(500).send({error:'Internal Server Error'}))
    }
}

module.exports = new HomeController;