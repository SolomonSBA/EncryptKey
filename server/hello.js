/**
 * Minimal Node test for SmarterASP – no ESM, no dependencies.
 * If https://encryptkey.co.uk/api/ returns "OK", the platform/handler works.
 * Uses CommonJS and process.env.PORT as required by the host.
 */
var http = require('http');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
}).listen(port, function () {
  console.log('hello.js listening on port ' + port);
});
