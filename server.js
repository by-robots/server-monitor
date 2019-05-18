// External
const http = require('http')
const url = require('url')

/**
 * Start the HTTP server.
 *
 * @callback route Callback to handle the app's routing.
 * @param {Object} handle Route => Handler mapping
 */
function start (route, handle) {
  http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname
    route(handle, pathname, response, request)
  }).listen(process.env.SERVER_PORT)
}

exports.start = start
