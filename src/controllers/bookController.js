const Book = require('../model/book')
const path = require('path')
const book = require('../model/book')
// const {ExportToCsv} = require('export-to-csv')
const csvcreator = require('json2csv')
const fs = require('fs')
const fastcsv = require('fast-csv')
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
        // res.status(302).redirect('/')
        res.status(302).redirect('/')
        }
        catch {()=> res.status(400).json({error: 'error'})}
    }

    detail(req, res, next) {
        Book.findOne({slug: req.params.slug}).lean()
        .then(book => {
            res.status(200).render('books/detail',book)
            // res.status(200).json(book)
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
            // res.status(200).json(book)
            res.status(200).send(book)
        })
        .catch((next) => res.status(500).send({error: `Internal Server Error`}))
    }
    delete(req, res, next) {
        console.log(req.params.slug)
        Book.findOneAndDelete({slug: req.params.slug})
        // .then((book) => res.status(200).json(book))
        .then(() => res.status(202).redirect('/'))
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
            
            // let json2csv =csvcreator.parse(books)
            // console.log(typeof books) 
            // console.log(typeof json2csv)
            // return res.status(200).send(json2csv)
            // let ws = fileStyle.createWriteStream("src/public/data.csv")
            // fastcsv
            // .write(books,{headers:true})
            // .on("finish", () =>{
            //     console.log('done')
            // })
            // .on("end",data=>{
            //     res.send(data)
            // })
            // .pipe(ws)
           
            // // res.send(ws)
        })
        .catch(next)
    }
}

module.exports = new bookController;