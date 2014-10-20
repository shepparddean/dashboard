// server.js

// BASE SETUP
// =============================================================================

//just include some js?
var utilities = require('./js/utilities');

// call the packages we need
var express        = require('express'); // call express
var app            = express(); // define our app using express
var sql            = require('mssql'); // microsoft sql driver
var morgan         = require('morgan'); // log requests to the console (express4)
var bodyParser     = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

//load the routes
require('./routes/applications')(app);
require('./routes/fundings')(app);
require('./routes/offers')(app);
require('./routes/companies')(app);
require('./routes/users')(app);
require('./routes/reports')(app);



// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080; // set our port

app.listen(port);
console.log('Magic happens on port ' + port);