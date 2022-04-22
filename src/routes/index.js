const homeRouter = require('./home')
const userRouter = require('./user')
const bookRouter = require('./book')

function route(app){

    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/filter', homeRouter);
    app.use('/', homeRouter);
}

module.exports = route;
