/**
 * The root route.
 *
 * @param {Object} response Response object for responding to the request.
 */
function start (response) {
  // TODO: Remove view code from controller code.
  const body = `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
    </head>
    <body>
      <h1>Server Monitor</h1>
      <p>TODO</p>
    </body>
    </html>`

  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write(body)
  response.end()
}

exports.start = start
