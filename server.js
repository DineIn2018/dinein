//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//MongoDB
mongoose.connect('mongodb+srv://cnitz:9W7LZ2Bsq9ahOli6@startingcluster-wkejy.mongodb.net/DineInDB');

//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/api'));

//Start server
app.listen(process.env.PORT || 8080);
console.log('API is running on port 8080');