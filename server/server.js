'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var Client = require('node-rest-client').Client;
var proxy = require('http-proxy-middleware');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

require("jsdom/lib/old-api.js").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    global.$  = require("jquery")(window);
});
global.app = app;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

/*generators to app object.*/
var common = require("./generators/common");
var dataTypeGenerator = require("./generators/data-type/data-type-generator");
var customTypeGenerator = require("./generators/resource-type/resource-type-generator");
var coreRamlGenerator = require("./generators/core-raml/core-raml-generator");
var completeRamlGenerator = require("./generators/complete-raml/complete-raml-generator");




// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
