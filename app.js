// Load config with dotenv
require('dotenv').config()

// External
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')

// Internal
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

// Create Express
var app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// Define routes.
app.use('/', indexRouter)
app.use('/users', usersRouter)

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
