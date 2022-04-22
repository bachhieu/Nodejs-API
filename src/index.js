const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const app = express()
require('dotenv').config();
const port = process.env.PORT ||3000;
const route = require('./routes')
const methodOverride = require('method-override')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// connect to database
require("./config/database").connect();

// express-handlebars
app.engine('.hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resourse/views'))

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Labrary API',
        version: '1.0.0',
        description: '...'
      },
      servers:[
          {
              url: 'http://127.0.0.1:3000'
          }
      ]
    },
    apis: ['./src/routes/*.js'], // files containing annotations as above
}
const specs = swaggerJsdoc(options)
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(specs))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))  // static route
// connect to Database
// const db = require('./config/database')
// db.connect();
route(app)

app.listen(port, console.log(`listen on port ${port}`))