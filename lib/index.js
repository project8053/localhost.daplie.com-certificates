'use strict';

// Assumptions:
//   you have a project with a web app such as ~/my-project/lib/server.js
//   you will place the certs in ~/my-project/certs/
//
// git clone https://github.com/Daplie/localhost.daplie.com-certificates.git ../certs

var fs = require('fs');
var path = require('path');
var certsPath = path.join(__dirname, '..', 'certs', 'server');
var caCertsPath = path.join(__dirname, '..', 'certs', 'ca');

//
// SSL Certificates
//
var options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
, cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))
, ca: [
    fs.readFileSync(path.join(caCertsPath, 'intermediate.crt.pem'))
  , fs.readFileSync(path.join(caCertsPath, 'root.crt.pem'))
  ]
, requestCert: false
, rejectUnauthorized: true

  // If you need to use SNICallback you should be using io.js >= 1.x (possibly node >= 0.12)
, SNICallback: function (domainname, cb) {
    // null means all requests will default to this certificate
    var secureContext = null;

    if ('function' === typeof cb) {
      cb(secureContext);
    }
  }
  // If you need to support SPDY/HTTP2 this is what you need to work with
//, NPNProtocols: ['http/2.0', 'spdy', 'http/1.1', 'http/1.0']
  , NPNProtocols: ['http/1.1', 'http/1.0']
};

module.exports = options.options = options;
// var server = https.createServer(options || require('localhost.daplie.com-certificates'));
// server.on('request', function (req, res) { res.end('hello'); });
// server.listen(443, function () { console.log('<https://localhost.daplie.com>'); });
