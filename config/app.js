let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');

let app = express();

//Database setup
let mongoose = require('mongoose');
let dbURI = require('./db');

// Connect to the Database
mongoose.connect(dbURI.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

 app.use(session({
   saveUninitialized: true,
   resave: true,
   secret: "sessionSecret"
 }));

var indexRouter = require('../routes/index');
//var usersRouter = require('./routes/users');

var ProjectRouter = require('../routes/project');
var aboutRouter = require('../routes/about');
var servicesRouter = require('../routes/services');
var contactRouter = require('../routes/contact');
var buscontactRouter1 = require('../routes/buscontact');
var usersRouter = require('../routes/users');

		


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../routes')));


// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/project', ProjectRouter);
app.use('/about', aboutRouter);
app.use('/services', servicesRouter);
app.use('/contact', contactRouter);
app.use('/buscontact', buscontactRouter1);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
