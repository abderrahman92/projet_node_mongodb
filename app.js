//variables
var express = require('express');
var path = require('path');
var indexRoute= require('./routes/index');
var mongoose = require('mongoose');
var app = express();
var port = 5000
const bodyParser = require('body-parser')

// Connexion à la base de données
mongoose.connect('mongodb+srv://user-123:user-123@mini-mern-tut.vus28.mongodb.net/project?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use('/', indexRoute);

//run project in port 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
