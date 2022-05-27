const Book = require('../model/book')
const Handlebars = require("handlebars");
Handlebars.registerPartial('email', '{{email}}');
Handlebars.registerPartial('name', '{{name}}');
class HomeController {
    index(req, res, next) {
        // const email = req.user.email;
        // const name= {name:"hieu"}
        const email={email:req.user.email}
        Book.find().lean()
        .then(book => {
            res.status(200).render('home',{book,email})
        })
        .catch(()=> res.status(500).send({error:'Internal Server Error'}))
    }
}

module.exports = new HomeController;    