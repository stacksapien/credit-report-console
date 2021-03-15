var express = require('express'),
app = express(),
port = process.env.PORT || 4018


const path = require('path')
let root = path.join(__dirname, 'build/')
app.use(express.static(root))
app.use(function(req, res, next) {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root })
  } else next()
})
// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port, function()  {
    console.log(`Magic happens on`, port);
})
