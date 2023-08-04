// Create web server

// Require
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

// Create web server
var app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment');

// Set view engine
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static('public'));

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// GET /: get all comments
app.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send('Error!');
        } else {
            res.render('index', { comments: comments });
        }
    });
});

// POST /: post a comment
app.post('/', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            res.send('Error!');
        } else {
            res.redirect('/');
        }
    });
});

// Listen on port 3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});

