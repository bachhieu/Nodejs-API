const Book = require('../model/book')
const User = require('../model/user')
const path = require('path')
const book = require('../model/book')
// const {ExportToCsv} = require('export-to-csv')
const csvcreator = require('json2csv')
const fs = require('fs')
const fastcsv = require('fast-csv')
var _ = require('lodash');
const Handlebars = require("handlebars");
Handlebars.registerPartial('email', '{{email}}');
class bookController {

    index(req, res, next) {
        try {
          const email= {email:req.user.email}
          res.status(201).render('books/create',{email})
      }
      catch {res.status(500).send({error: 'Internal Server Error'}) }
    }
    async create(req, res, next) {
        
        const book = await new Book ({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image :{
                data: path.join('img/' + req.file.filename),
                contentType: 'image/png',
            },
            authorID: req.user.user_id,
        })
        try {
            book.save()
            await User.findOneAndUpdate({_id:req.user.user_id},{ $push: { books: book._id } })
            res.status(302).redirect('/')
        }
        catch {()=> res.status(400).json({error: 'error'})}
    }

    detail(req, res, next) {
        const email= {email:req.user.email}
        Book.findOne({slug: req.params.slug}).populate('authorID','fullname').lean()
        .then(book => {
            res.status(200).render('books/detail',{book,email})
        })
        .catch(() => res.status(404).render({error:'error'}))

    }
    showedit(req, res, next) {
        Book.findOne({ slug: req.params.slug})
        // .then(book =>res.status(200).json(book) )
        .then(book =>res.status(200).render('books/edit',book) )
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
            res.status(200).send(book)
        })
        .catch((next) => res.status(500).send({error: `Internal Server Error`}))
    }
    async delete(req, res, next) {
        Book.findOneAndDelete({slug: req.params.slug})
        .then(async book =>{ 
            const user = await User.findOne({email: req.user.email},{books:1})
            // because _id is ObjectId 
          const remove= _.remove(user.books,idBook =>idBook.toString()==book._id.toString() )
        //   update file books of user
           await User.updateOne({email: req.user.email},{books:user.books})
            res.status(202).redirect('/')
    })
        .catch((next) => res.status(500).send({error: `Internal Server Error`}))
        // console.log(req.params.slug)
        // res.redirect('/')
    }
    filter(req, res, next) {
        const categories = req.query.category || [];
        // console.log(categories)
        const names = req.query.name || '';

        Book.find({$or: [
            {category:{$all:categories}},
            { name:{$all:names}}
        ]})
        .then((book) =>{
        // console.log(book)
            // res.status(200).send(book);
            
            res.status(200).send({book})
        })
        .catch (() => res.status(404).send({error: 'Book not found'}))
    }
     list(req, res, next){
        Book.find({},{_id:0,name:1,price:1,description:1}).lean()
        .then( async books=>{
            let arr= []
            const headers = Object.keys(books[0])
            arr.push(headers)
            books.forEach(book=>{
                arr.push(Object.values(book))
            })
            arr = arr.join('\r\n')
            fs.writeFile('src/public/output.csv',arr,(err,data)=>{
                if(err){
                    return console.log(err)
                }
            })
            return res.status(200).attachment('src/public/output.csv').send(arr)

        })
        .catch(next)
    }
}

module.exports = new bookController;