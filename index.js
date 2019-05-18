'use strict'

// External.
require('dotenv').config()

// Internal.
const router = require('./router')
const server = require('./server')
const requestHandlers = require('./handlers')

// Route handlers.
const handle = {}
handle['/'] = requestHandlers.start

// Make it so.
server.start(router.route, handle)
