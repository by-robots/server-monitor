// Load config with dotenv
require('dotenv').config()

// External
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const postcssMiddleware = require('postcss-middleware')

// Internal
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// Create Express
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'public'),
  includePaths: [path.join(__dirname, 'node_modules')],
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(postcssMiddleware({
  plugins: [
    require('tailwindcss')
  ],
  src: function (req) {
    return path.join(__dirname, 'public', req.path)
  }
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
