/**
 * Handles HTTP request routing.
 *
 * @param {Object} handle   Map of route => handlers.
 * @param {String} pathname The pathname of the current request.
 * @param {Object} response For responding to the request.
 * @param {String} request  The request object.
 */
function route (handle, pathname, response, request) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request)
    return
  }

  response.writeHead(404, { 'Content-Type': 'text/plain' })
  response.write('404 Not Found')
  response.end()
}

exports.route = route
