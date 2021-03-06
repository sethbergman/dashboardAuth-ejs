var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var hogan = require('hogan.js');
var path = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); // connect to our database
//db.on('error', console.error.bind(console, 'connection error:'));

var superhero = require('./app/routes/superhero')();

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var nunjucks = require('nunjucks');
require('./config/passport')(passport); // pass passport for configuration

/*
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
*/


// express setup ===============================================================
app.set('view engine', 'ejs'); // set up ejs for templating
app.use('/assets', express.static(__dirname + '/assets'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'myWifeisHOTTT' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Session-persisted message middleware



// routes ======================================================================
require('./app/routes/passport')(app, passport); // load routes and pass in our app

// filestacker setup ===========================================================
app.route('/superhero')
	.post(superhero.post)
	.get(superhero.getAll);
app.route('/superhero/:id')
	.get(superhero.getOne);

// launch ======================================================================
var server = app.listen(process.env.PORT || 5000, function () {
  console.log('Server running at http://0.0.0.0:' + server.address().port)
})
