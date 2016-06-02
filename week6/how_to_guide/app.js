var http = require('http');
var server  = http.createServer(function(req, res)
{
console.log(req, url)
res.writeHead({myinformation:'Welcome To Node.js'});
res.write('Hello world!');
res.end();
});

server.listen(8080);