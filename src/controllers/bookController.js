const Book = require('../model/book')
const path = require('path')
const book = require('../model/book')

class bookController {
    index(req, res, next) {
      try {
          res.status(201).render('books/create')
      }
      catch {res.status(500).send({error: 'Internal Server Error'}) }
    }
    async create(req, res, next) {
        // console.log(req.body)

        const book = await new Book ({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image :{
                data: path.join('img/' + req.file.filename),
                contentType: 'image/png',

            }
        })
        try {
        book.save()
        res.status(302).redirect('/')
        // res.status(200).redirect('/')
        }
        catch {()=> res.status(400).json({error: 'error'})}
    }

    detail(req, res, next) {
        Book.findOne({slug: req.params.slug}).lean()
        .then(book => {
            res.status(200).json(book)
        })
        .catch(() => res.status(404).render({error:'error'}))

    }
    showedit(req, res, next) {
        Book.findOne({ slug: req.params.slug})
        .then(book =>res.status(200).json(book) )
        // .then(book =>res.render('books/edit',book) )
        .catch(() => res.status(404).render({error: 'error'}))
    }
    edit(req, res, next){
        Book.findOneAndUpdate({ slug: req.params.slug},{...req.body})
        .then(book => {
            res.status(200).redirect(`/book/${book.slug}`)
        })
        .catch((next) => res.status(500).render({error: 'error'}))
    }
    rating(req, res, next) {
        Book.findOne({slug: req.params.slug})
        .then(book => {
            book.avgRating = req.body.avgRating
            book.save()
            res.status(200).json(book)
            // res.status(200).render('books/detail',book)
        })
        .catch((next) => res.status(500).send({error: `Internal Server Error`}))
    }
    delete(req, res, next) {
        Book.findOneAndDelete({slug: req.params.slug})
        .then((book) => res.status(200).json(book))
        // .then(() => res.status(200).redirect('/'))
        .catch((next) => res.status(500).send({error: `Internal Server Error`}))
        // console.log(req.params.slug)
        // res.redirect('/')
    }
    filter(req, res, next) {
        const categories = req.query.category || [];
        const names = req.query.name || '';

        Book.find({$or: [
            {category:{$all:categories}},
            { name:{$all:names}}
        ]})
        .then((book) =>{
        // console.log(book)
            res.status(200).json(book)
            // console.log(res.json(book))
            
            // res.status(200).render('filter',{book})
        })
        .catch (() => res.status(404).send({error: 'Book not found'}))
    }
}

module.exports = new bookController;